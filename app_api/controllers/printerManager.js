var util = require('util');
var db = require('../models/db');
var helpers = require('./helpers');
var chalk = require('chalk');




var printerMonitorLib  = require('../../lib/printerMonitorData.js')

// will need to change this
var debug = require("../../lib/printerMonitorDebug");

// helpers

// unflattenColorLevelStatuses takes the flattened data coming back from the database
// and turns it into more of a JSON structure so not so much data is repeated.
// It also makes it compatible with the first version of this app which
// was parsing data from files instead of from a database.
// data coming in:
/*
+---------+-------------------+---------------+---------------------+---------+--------------+-------------------------+
| room    | mac_address       | ip_address    | collect_time        | color   | percent_full | name                    |
+---------+-------------------+---------------+---------------------+---------+--------------+-------------------------+
| a101    | 00-26-73-12-D4-6A | 10.177.200.23 | 2017-04-20 12:00:00 | black   |           20 | Ricoh-SP3400N           |
| a102    | 00-26-73-69-8E-15 | 10.177.200.65 | 2017-04-20 12:00:00 | black   |           80 | Ricoh-SPC252SF          |
| a102    | 00-26-73-69-8E-15 | 10.177.200.65 | 2017-04-20 12:00:00 | magenta |          100 | Ricoh-SPC252SF          |
| a102    | 00-26-73-69-8E-15 | 10.177.200.65 | 2017-04-20 12:00:00 | yellow  |           80 | Ricoh-SPC252SF          |
| a102    | 00-26-73-69-8E-15 | 10.177.200.65 | 2017-04-20 12:00:00 | cyan    |          100 | Ricoh-SPC252SF          |
| a103    | 00-26-73-53-88-47 | 10.177.200.40 | 2017-04-20 12:00:00 | black   |           60 | Ricoh-SP3500N           |

or like this, actually:
{
    "printers": [
        {
            "room": "a101",
            "mac_address": "00-26-73-12-D4-6A",
            "ip_address": "10.177.200.23",
            "collect_time": "2017-04-20 12:00:00",
            "color": "black",
            "percent_full": 20,
            "name": "Ricoh-SP3400N"
        },
        {
            "room": "a102",
            "mac_address": "00-26-73-69-8E-15",
            "ip_address": "10.177.200.65",
            "collect_time": "2017-04-20 12:00:00",
            "color": "black",
            "percent_full": 80,
            "name": "Ricoh-SPC252SF"
        },

returning:
  flattened : [
  {
    parsingStatus: 'successful',
    room: 'a101',
    MACaddress: '00-26-73-12-D4-6A',
    IPaddress: '10.177.200.23',
    printerModel: 'Ricoh-SP3400N',
    statusDate: '2017-04-20 12:00:00',
    tonerStatus: [ { color: 'black', percentFull: 20 } ]
  },
  {
    parsingStatus: 'successful',
    room: 'a102',
    MACaddress: '00-26-73-69-8E-15',
    IPaddress: '10.177.200.65',
    printerModel: 'Ricoh-SPC252SF',
    statusDate: '2017-04-20 12:00:00',
    tonerStatus: [
      { color: 'black', percentFull: 80 },
      { color: 'magenta', percentFull: 100 },
      { color: 'yellow', percentFull: 80 },
      { color: 'cyan', percentFull: 100 }
    ]
  },
*/


var unflattenColorLevelStatuses = function(flatColorLevelData) {

  let results = [];
  let lastMacAddress = "";
  let currentPrinterObj = null;
  for (let i = 0; i < flatColorLevelData.length; ++i){
    let colorLevel = flatColorLevelData[i];
    if (colorLevel.mac_address != lastMacAddress) {  // a new printer
      currentPrinterObj = {};        // create a new object
      results.push(currentPrinterObj);  // put it on the list
      currentPrinterObj.parsingStatus = "successful";  // not sure needed
      currentPrinterObj.room = colorLevel.room;
      currentPrinterObj.MACaddress = colorLevel.mac_address;
      currentPrinterObj.IPaddress = colorLevel.ip_address;
      currentPrinterObj.printerModel = colorLevel.name;
      currentPrinterObj.statusDate = colorLevel.collect_time;
      currentPrinterObj.tonerStatus = [];
    }
    // put the toner statuses in a list
    let aColorLevelStatus = {};
    aColorLevelStatus.color = colorLevel.color;
    aColorLevelStatus.percentFull = colorLevel.percent_full;
    currentPrinterObj.tonerStatus.push(aColorLevelStatus);
    lastMacAddress = colorLevel.mac_address;

  }
  //console.log(chalk.red("flattened : " + util.inspect(results, false, null)));
  return results;
};


// interface


module.exports.ack = function (req, res) {
  debug.log("ack request");
  var ackResponse = 'hi-from-printerManager';
  helpers.sendTextResponse(res, 200, ackResponse);
};


module.exports.getSnmpPrinters = function (req, res) {

  db.pool.query("call get_snmp_printers()", function(err, rows, fields) {

  //console.log(chalk.green("err : " + util.inspect(err, false, null)));
  //console.log(chalk.green("rows : " + util.inspect(rows, false, null)));
  //console.log(chalk.green("fields : " + util.inspect(fields, false, null)));

    var data = {};
    data['printers'] = [];
    data['errors'] = [];

    if (err) {
      helpers.sendJsonSQLErrorResponse("Error retrieving data from database for printers",
                            "danger",
                            err,
                            data,
                            res);
    } else {
      data['printers'] =  rows[0];
      helpers.sendJsonResponse(res, 200, data);
    }
  });
};


// convert the list of printer objects into a string of lines, one for each
// printer.
var printerJsonToTsv = function(printerList) {
   let result = "";
   for (let i = 0; i < printerList.length; ++i) {
     const {ip_address, room, model_name} = printerList[i];
     result += `${ip_address}\t${room}\t${model_name}`;
     if (i < (printerList.length - 1)) {
       result += `\n`;
     }
   }
   return result;
};

module.exports.getSnmpPrintersTsv = function (req, res) {

  db.pool.query("call get_snmp_printers()", function(err, rows, fields) {

  //console.log(chalk.green("err : " + util.inspect(err, false, null)));
  //console.log(chalk.green("rows : " + util.inspect(rows, false, null)));
  //console.log(chalk.green("fields : " + util.inspect(fields, false, null)));

    var data = {};
    data['printers'] = [];
    data['errors'] = [];

    if (err) {
      helpers.sendJsonSQLErrorResponse("Error retrieving data from database for printers",
                            "danger",
                            err,
                            data,
                            res);
    } else {
      data['printers'] =  rows[0];
      helpers.sendTextResponse(res, 200, printerJsonToTsv(rows[0]));
    }
  });
};


module.exports.getTonerStatuses = function (req, res) {
  //debug.log("calling getTonerStatuses");
  helpers.sendJsonResponse(res, 201, printerMonitorLib.getTonerStatuses());
};

module.exports.newGetTonerStatuses = function (req, res) {

  db.pool.query("select room, mac_address, ip_address, collect_time, color, percent_full, name from color_level_statuses", function(err, rows, fields) {

  //console.log(chalk.green("err : " + util.inspect(err, false, null)));
  //console.log(chalk.green("rows : " + util.inspect(rows, false, null)));
  //console.log(chalk.green("fields : " + util.inspect(fields, false, null)));

    var data = {};
    data['printers'] = [];
    data['errors'] = [];

    if (err) {
      helpers.sendJsonSQLErrorResponse("Error retrieving data from database for printers",
                            "danger",
                            err,
                            data,
                            res);
    } else {
      helpers.sendJsonResponse(res, 200, unflattenColorLevelStatuses(rows));
    }
  });
};


module.exports.addColorLevel = function (req, res) {

  //console.log(chalk.blue(util.inspect(req.body, false, null)));

  let ip_address   = req.body.ip_address;
  let color        = req.body.color;
  let percent_full = req.body.percent_full;
  let collect_time = req.body.collect_time;

  db.pool.query(`call add_color_level("${ip_address}", "${collect_time}", "${color}", ${percent_full})`, function(err, rows, fields) {

  //console.log(chalk.blue("err : " + util.inspect(err, false, null)));
  //console.log(chalk.blue("rows : " + util.inspect(rows, false, null)));
  //console.log(chalk.blue("fields : " + util.inspect(fields, false, null)));

    var data = {};
    data['add_results'] = [];
    data['errors'] = [];

    // addColorPercentFull normally does not return any data, but if it catches an exception and rolls back
    // the transaction, the error comes back as a data row.
    // rows : [ [ RowDataPacket {
    //       Level: 'Error',
    //       Code: 1062,
    //       Message: 'Duplicate entry \'1-501\' for key \'natural\'' } ],
    //   OkPacket {
    //     fieldCount: 0,
    if ((err === null) && (rows !== null) && (rows !== undefined) && (rows.length > 1 )) {
      helpers.sendJsonSQLErrorResponse("Error adding color percent full",
                            "danger",
                            rows[0][0],  // this is the array of errors
                            data,
                            res);
    }
    else if (err) {
      helpers.sendJsonSQLErrorResponse("Error adding color percent full",
                            "danger",
                            err,
                            data,
                            res);
    } else {
      // calling a procedure returns a 2 element array with first element being the rows
      // and the second element being the meta data such as "fieldCount".
      data['add_results'] = rows[0];  // this will be empty when successful
      helpers.sendJsonResponse(res, 201, data);
    }
  });
};
