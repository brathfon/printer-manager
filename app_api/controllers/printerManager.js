var util = require('util');
var db = require('../models/db');
var helpers = require('./helpers');



var printerMonitorLib  = require('../../lib/printerMonitorData.js')

// will need to change this
var debug = require("../../lib/printerMonitorDebug");



module.exports.ack = function (req, res) {
  debug.log("ack request");
  var ackResponse = 'hi-from-printerManager';
  helpers.sendTextResponse(res, 201, ackResponse);
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
      helpers.sendJsonResponse(res, 201, data);
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
      helpers.sendTextResponse(res, 201, printerJsonToTsv(rows[0]));
    }
  });
};


module.exports.getTonerStatuses = function (req, res) {
  debug.log("calling getTonerStatuses");
  helpers.sendJsonResponse(res, 201, printerMonitorLib.getTonerStatuses());
};


module.exports.addColorLevel = function (req, res) {

  //console.log(chalk.blue(util.inspect(req.body, false, null)));


  let ip_address   = req.body.ip_address;
  let color        = req.body.color;
  let level        = req.body.level;

  db.pool.query(`call add_color_level("${ip_address}", "${color}", ${level})`, function(err, rows, fields) {

  //console.log(chalk.blue("err : " + util.inspect(err, false, null)));
  //console.log(chalk.blue("rows : " + util.inspect(rows, false, null)));
  //console.log(chalk.blue("fields : " + util.inspect(fields, false, null)));

    var data = {};
    data['add_results'] = [];
    data['errors'] = [];

    // add color level normally does not return any data, but if it catches an exception and rolls back
    // the transaction, the error comes back as a data row.
    // rows : [ [ RowDataPacket {
    //       Level: 'Error',
    //       Code: 1062,
    //       Message: 'Duplicate entry \'1-501\' for key \'natural\'' } ],
    //   OkPacket {
    //     fieldCount: 0,
    if ((err === null) && (rows !== null) && (rows !== undefined) && (rows.length > 1 )) {
      helpers.sendJsonSQLErrorResponse("Error adding color level",
                            "danger",
                            rows[0][0],  // this is the array of errors
                            data,
                            res);
    }
    else if (err) {
      helpers.sendJsonSQLErrorResponse("Error adding color level",
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
