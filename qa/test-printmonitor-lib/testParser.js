#!/usr/bin/env node


var printerMonitorParser = require('../../lib/printerMonitorParser.js');
var util = require('util');


console.log("arv0 " + process.argv[0]);
console.log("arv1 " + process.argv[1]);
console.log("arv2 " + process.argv[2]);


var room = process.argv[2];

console.log("");
console.log("");
console.log("");
console.log("");
console.log("Test printerMonitorParser()");

var baseDir = "/Volumes/media1/testData/printermonitor-20170420/results/";

var mainFileRicoh252 = baseDir + "printer_00-26-73-97-BC-E8/2016-08-24";
var mainFileRicoh3500 = baseDir + "printer_00-26-73-88-87-81/2016-08-24";
var mainFileRicoh3400 = baseDir + "printer_00-26-73-12-D7-4F/2016-08-24";
var topPageFileRicoh3600 = baseDir + "printer_00-26-73-CA-BB-39/2017-02-10";
var deviceStatusFileHP_P1606dn = baseDir + "printer_AC-16-2D-CB-00-3A/2017-04-20";

//var info = printerMonitorParser.parseRicoh252File(mainFileRicoh252);
//var info = printerMonitorParser.parseRicoh3400File(mainFileRicoh3400);
//var info = printerMonitorParser.parseRicoh3500File(mainFileRicoh3500);
//var info = printerMonitorParser.parseRicoh3600File(topPageFileRicoh3600);
var info = printerMonitorParser.parseHP_P1606dnFile(deviceStatusFileHP_P1606dn);
console.log(util.inspect(info, false, null));

//toner = printerMonitorParser.getTonerStatusRicoh252(mainFileRicoh252);
//toner = printerMonitorParser.getTonerStatusRicoh3400(mainFileRicoh3400);
//toner = printerMonitorParser.getTonerStatusRicoh3500(mainFileRicoh3500);
//toner = printerMonitorParser.getTonerStatusRicoh3600(topPageFileRicoh3600);
toner = printerMonitorParser.getTonerStatusHP_P1606dn(deviceStatusFileHP_P1606dn);
console.log(util.inspect(toner, false, null));
