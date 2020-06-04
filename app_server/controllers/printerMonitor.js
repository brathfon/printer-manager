var util = require('util');
var debug = require("../../lib/printerMonitorDebug");
var chalk = require("chalk");


var request = require('request');
var apiOptions = { server: "http://localhost:3004" };

var printerMonitorApiOptions = { server: "http://localhost:3004" };  // for getting sysmon data

if (process.env.PRINTER_MONITOR_URL) {
  printerMonitorApiOptions = { server: process.env.PRINTER_MONITOR_URL };  // for getting sysmon data
  console.log(chalk.blue("Setting PRINTER_MONITOR_URL to " + util.inspect(printerMonitorApiOptions, false, null)));
}
else {
  console.log(chalk.blue("Keeping PRINTER_MONITOR_URL default of " + util.inspect(printerMonitorApiOptions, false, null)));
}



var getTonerStatuses = function(req, res, data, callback){

  var path = "/api/newGetTonerStatuses";

  var requestOptions = {
    url: printerMonitorApiOptions.server + path,
    method: "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, tonerStatuses) {
      data["tonerStatuses"] = tonerStatuses;  // add the results to the data object
      if (callback) {
        callback(req, res, data, callback);
      }
    }
  );
};


var sortByCriticalToner = function (a, b) {

  if (a.tonerStatus[0].percentFull < b.tonerStatus[0].percentFull)
    return -1;
  if (a.tonerStatus[0].percentFull > b.tonerStatus[0].percentFull)
    return 1;
  if (a.tonerStatus[0].color < b.tonerStatus[0].color)
    return -1;
  if (a.tonerStatus[0].color > b.tonerStatus[0].color)
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
  if (a.tonerStatus[0].color < b.tonerStatus[0].color)
    return -1;
  if (a.tonerStatus[0].color > b.tonerStatus[0].color)
    return 1;
  if (a.tonerStatus[0].percentFull < b.tonerStatus[0].percentFull)
    return -1;
  if (a.tonerStatus[0].percentFull > b.tonerStatus[0].percentFull)
    return 1;
  if (a.room < b.room)
    return -1;
  if (a.room > b.room)
    return 1;
  return 0;
};




var flattenTonerStatuses = function(tonerStatuses) {
  var flattenedStatuses = [];
  var newObj = {};
  tonerStatuses.forEach(function (printerStatus) {
    //debug.log("flattenTonerStatuses : " + util.inspect(printerStatus, false, null));
    if (printerStatus.tonerStatus) {
      printerStatus.tonerStatus.forEach( function (tonerStatus) {
        newObj = {};
        newObj['room']         = printerStatus.room;
        newObj['MACaddress']   = printerStatus.MACaddress;
        newObj['IPaddress']    = printerStatus.IPaddress;
        newObj['printerModel'] = printerStatus.printerModel;
        newObj['statusDate']   = printerStatus.statusDate;
        // there will only be one status object in the list.  This helps on the other end when reusing the jade mixins
        newObj['tonerStatus']  = [{ 'color': tonerStatus.color, 'nativeValue': tonerStatus.nativeValue, 'percentFull': tonerStatus.percentFull}];
        flattenedStatuses.push(newObj);
      });
    }
  });

  //debug.log("flattenTonerStatuses : " + util.inspect(flattenedStatuses, false, null));
  return flattenedStatuses;

};


var addLowestTonerLevel = function(tonerStatuses) {

  tonerStatuses.forEach(function (printerStatus) {
    var lowestTonerLevel = 100;
    //debug.log("flattenTonerStatuses : " + util.inspect(printerStatus, false, null));
    if (printerStatus.tonerStatus) {
      printerStatus.tonerStatus.forEach( function (tonerStatus) {
        if (tonerStatus.percentFull < lowestTonerLevel) {
          lowestTonerLevel = tonerStatus.percentFull;
        }
      });
    }
    printerStatus['lowestTonerLevel'] = lowestTonerLevel;
  });
};



var createCriticalCartridgesData = function(req, res, data, callback){
  //debug.log("createCriticalCartridgeData : " + util.inspect(data.tonerStatuses, false, null));
  addLowestTonerLevel(data.tonerStatuses);
  var flattenedStatuses   = flattenTonerStatuses(data.tonerStatuses);
  data.cartridgesByType   = flattenTonerStatuses(data.tonerStatuses).sort(sortByPrinterModel);
  data.criticalCartridges = flattenTonerStatuses(data.tonerStatuses).sort(sortByCriticalToner);

  if (callback) {
    callback(req, res, data, callback);
  }
};


var renderReports = function(req, res, data){
  //debug.log("renderReports : " + util.inspect(data, false, null));
  res.render('reports',
            { title: 'Toner Status',
              tonerReportRecords: data.tonerStatuses,
              criticalCartridges: data.criticalCartridges,
              cartridgesByType: data.cartridgesByType
            }
  );
};


module.exports.reports =  function (req, res) {
  var data = {};
  getTonerStatuses (req, res, data,
    function(req, res, data) {
      createCriticalCartridgesData (req, res, data,
        function(req, res, data) {
          renderReports(req, res, data);
      });
  });
};
