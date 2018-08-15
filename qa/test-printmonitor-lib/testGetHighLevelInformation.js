#!/usr/bin/env node


var printerMonitorData = require('../../lib/printerMonitorData.js');
var util = require('util');


console.log("arv0 " + process.argv[0]);
console.log("arv1 " + process.argv[1]);
console.log("arv2 " + process.argv[2]);


var room = process.argv[2];

console.log("");
console.log("");
console.log("");
console.log("");
console.log("Test getHighLevelInformation()");

var info = printerMonitorData.getHighLevelInformation();
console.log(util.inspect(info, false, null));
