var util = require('util');
var chalk = require("chalk");


var request = require('request');
var apiOptions = { server: "http://localhost:3004" };

var printerManagerApiOptions = { server: "http://localhost:3004" };  // for getting sysmon data

if (process.env.PRINTER_MONITOR_URL) {
  printerManagerApiOptions = { server: process.env.PRINTER_MONITOR_URL };  // for getting sysmon data
  console.log(chalk.blue("Setting PRINTER_MONITOR_URL to " + util.inspect(printerManagerApiOptions, false, null)));
}
else {
  console.log(chalk.blue("Keeping PRINTER_MONITOR_URL default of " + util.inspect(printerManagerApiOptions, false, null)));
}



var getColorLevelStatuses = function(req, res, data, callback){

  var path = "/api/getColorLevelStatuses";

  var requestOptions = {
    url: printerManagerApiOptions.server + path,
    method: "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, colorLevelStatuses) {
      data["colorLevelStatuses"] = colorLevelStatuses;  // add the results to the data object
      if (callback) {
        callback(req, res, data, callback);
      }
    }
  );
};


var sortByCriticalColorLevel = function (a, b) {

  if (a.colorLevelStatus[0].percentFull < b.colorLevelStatus[0].percentFull)
    return -1;
  if (a.colorLevelStatus[0].percentFull > b.colorLevelStatus[0].percentFull)
    return 1;
  if (a.colorLevelStatus[0].color < b.colorLevelStatus[0].color)
    return -1;
  if (a.colorLevelStatus[0].color > b.colorLevelStatus[0].color)
    return 1;
  if (a.printerModel < b.printerModel)
    return -1;
  if (a.printerModel > b.printerModel)
    return 1;
  if (a.room < b.room)
    return -1;
  if (a.room > b.room)
    return 1;
  return 0;
};


var sortByPrinterModel = function (a, b) {

  if (a.printerModel < b.printerModel)
    return -1;
  if (a.printerModel > b.printerModel)
    return 1;
  if (a.colorLevelStatus[0].color < b.colorLevelStatus[0].color)
    return -1;
  if (a.colorLevelStatus[0].color > b.colorLevelStatus[0].color)
    return 1;
  if (a.colorLevelStatus[0].percentFull < b.colorLevelStatus[0].percentFull)
    return -1;
  if (a.colorLevelStatus[0].percentFull > b.colorLevelStatus[0].percentFull)
    return 1;
  if (a.room < b.room)
    return -1;
  if (a.room > b.room)
    return 1;
  return 0;
};




var flattenColorLevelStatuses = function(colorLevelStatuses) {
  var flattenedStatuses = [];
  var newObj = {};
  colorLevelStatuses.forEach(function (printerStatus) {
    if (printerStatus.colorLevelStatus) {
      printerStatus.colorLevelStatus.forEach( function (colorLevelStatus) {
        newObj = {};
        newObj['room']         = printerStatus.room;
        newObj['MACaddress']   = printerStatus.MACaddress;
        newObj['IPaddress']    = printerStatus.IPaddress;
        newObj['printerModel'] = printerStatus.printerModel;
        newObj['statusDate']   = printerStatus.statusDate;
        // there will only be one status object in the list.  This helps on the other end when reusing the jade mixins
        newObj['colorLevelStatus']  = [{ 'color': colorLevelStatus.color, 'nativeValue': colorLevelStatus.nativeValue, 'percentFull': colorLevelStatus.percentFull}];
        flattenedStatuses.push(newObj);
      });
    }
  });

  return flattenedStatuses;

};


var addLowestColorLevelLevel = function(colorLevelStatuses) {

  colorLevelStatuses.forEach(function (printerStatus) {
    var lowestColorLevelLevel = 100;
    if (printerStatus.colorLevelStatus) {
      printerStatus.colorLevelStatus.forEach( function (colorLevelStatus) {
        if (colorLevelStatus.percentFull < lowestColorLevelLevel) {
          lowestColorLevelLevel = colorLevelStatus.percentFull;
        }
      });
    }
    printerStatus['lowestColorLevelLevel'] = lowestColorLevelLevel;
  });
};



var createCriticalCartridgesData = function(req, res, data, callback){
  addLowestColorLevelLevel(data.colorLevelStatuses);
  var flattenedStatuses   = flattenColorLevelStatuses(data.colorLevelStatuses);
  data.cartridgesByType   = flattenColorLevelStatuses(data.colorLevelStatuses).sort(sortByPrinterModel);
  data.criticalCartridges = flattenColorLevelStatuses(data.colorLevelStatuses).sort(sortByCriticalColorLevel);

  if (callback) {
    callback(req, res, data, callback);
  }
};


var renderReports = function(req, res, data){
  res.render('reports',
            { title: 'ColorLevel Status',
              colorLevelReportRecords: data.colorLevelStatuses,
              criticalCartridges: data.criticalCartridges,
              cartridgesByType: data.cartridgesByType
            }
  );
};


module.exports.reports =  function (req, res) {
  var data = {};
  getColorLevelStatuses (req, res, data,
    function(req, res, data) {
      createCriticalCartridgesData (req, res, data,
        function(req, res, data) {
          renderReports(req, res, data);
      });
  });
};
