#!/usr/bin/env node

// NOTE: this is the first file in the master branch that uses separate date and time fields

"use strict";

var mysql = require('mysql');
var util  = require('util');
var fs    = require('fs');

// set up the database stuff

var connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_DATABASE
});


connection.connect(function(err) {
  if (!err) {
    console.log("-- Database is connected");
  }
  else {
    console.error("Error connecting to database");
  }
});


var getModels = function (data, endConnection, callback) {

  var i = null;

  connection.query("select model_id, model_name, is_color, can_snmp_monitor from models", function(err, rows, fields) {

    if (endConnection) {
      connection.end();
    }
    if (!err) {
      data['modelNameToModelId'] = {};
      data['modelNameToCanSnmpMonitor'] = {};
      for (i in rows) {
        data['modelNameToModelId'][rows[i].model_name] = rows[i].model_id;
        data['modelNameToCanSnmpMonitor'][rows[i].model_name] = rows[i].can_snmp_monitor;
      }
      if (callback) {
        callback(data, endConnection, callback);
      }
    }
    else {
      console.log('Error while performing query');
      connection.end();
    }
  });
};



var printLookupData = function (data, endConnection, callback) {

  if (endConnection) {
    connection.end();
  }

  //console.log("data " + util.inspect(data , false, null));


  
    console.log("");;
    console.log("-- model_name to model_id");
  for (let model_name in data.modelNameToModelId) {
    console.log("-- model_name " + model_name + " model_id " + data.modelNameToModelId[model_name]);
  }

    console.log("");;
    console.log("-- model_name to can_snmp_monitor");
  for (let model_name in data.modelNameToCanSnmpMonitor) {
    console.log("-- model_name " + model_name + " can_snmp_monitor " + data.modelNameToCanSnmpMonitor[model_name]);
  }

  if (callback) {
    callback();
  }
}


/* reading this data from the file:
00-26-73-98-67-5E       10.177.200.82   Ricoh-SPC252SF  429-3188        p4
00-26-73-98-67-5F       10.177.200.83   Ricoh-SPC252SF  429-3191        b104
00-26-73-B2-DE-7F       10.177.200.86   Ricoh-SPC252SF  429-3191        c105
00-26-73-CA-BB-24       10.177.200.87   Ricoh-SP3600N   429-3216        nurse
*/

var readPrinterTsv = function (data, endConnection, callback) {

  //console.log(`in readPrinterTsv`);

  if (endConnection) {
    connection.end();
  }


  let mac_address = "";
  let ip_address = "";
  let model = "";
  let tag_number = "";
  let room = "";
  var contents = fs.readFileSync("./printerInfo.txt", 'utf8')
  //console.log("contents: " + contents);
  let lines = contents.split("\n");
  data['printersTableInserts'] = [];
  lines.forEach( function (line) {
    //console.log("line: " + line);
    [mac_address, ip_address, model, tag_number, room] = line.split("\t");

    // for some reason when you split on return you get blank last line.  Skip it by returning from the function
    // being applied to each list element
    if (mac_address == "") {
      return;
    }
    let model_id = data.modelNameToModelId[model];
    let is_monitored = data.modelNameToCanSnmpMonitor[model];

    // Will leave this "name" stuff in there, but not sure it should be stored in the database.
    // Not sure what it is used for and should probably be derived.

    let tag_for_name = "unknown";
    // not sure why the "OPT" in there when the tag was not known. 
    if (tag_number == "OPT") {
      tag_number = "null";
    }
    else {
      tag_for_name = tag_number; // put the quotes on there for the varchar insert statemetn
      tag_for_name = tag_for_name.replace("429-", "");  // get rid of the leading 429
      tag_number = `"${tag_number}"`; // put the quotes on there for the varchar insert statemetn
    }
    let name = `${room}-${tag_for_name}-${model}`;;
    // form a printer name
    let insertStatement = `INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored)`;
    insertStatement += ` VALUES ("${mac_address}", "${ip_address}", ${model_id}, ${tag_number}, "${room}", ${is_monitored});`;
    data['printersTableInserts'].push(insertStatement);
  });

  if (callback) {
    callback(data, endConnection, callback);
  }
};



var createSqlStatements = function (data, callback) {

  //console.log("data " + util.inspect(data , false, null));

  for(let i = 0; i < data['printersTableInserts'].length; ++i) {
    console.log(data['printersTableInserts'][i]);
  }

  if (callback) {
    callback();
  }
}



let theData = {};
   getModels(theData, false, function () {
     readPrinterTsv(theData, false, function () {
       printLookupData(theData, true, function () {
         createSqlStatements(theData, null);
       });
   });
});


