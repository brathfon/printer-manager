#!/usr/bin/env node


// This script gets not just the latest data for each printer, but the information for each day
// this was used for getting test data to populate the mySQL database.


var printerMonitorData = require('../../lib/printerMonitorData.js');
var util = require('util');


//console.log("arv0 " + process.argv[0]);
//console.log("arv1 " + process.argv[1]);
//console.log("arv2 " + process.argv[2]);


//var room = process.argv[2];

console.log("");
console.log("");
console.log("");
console.log("");
console.log("Test getTonerStatusHistory()");

var info = printerMonitorData.getTonerStatusHistory();
//console.log(util.inspect(info, false, null));

console.log(`Found ${info.length} statuses`);

for (let i = 0; i < info.length; ++i) {
  console.log(util.inspect(info[i], false, null));
}
