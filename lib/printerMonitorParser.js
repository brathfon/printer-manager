//var util = require('util');

var ricoh3400 = require("./Ricoh3400PostParser.js");
var ricoh3500 = require("./Ricoh3500PostParser.js");
var ricoh3600 = require("./Ricoh3600Parser.js");
var ricoh242 = require("./Ricoh242PostParser.js");
var ricoh252 = require("./Ricoh252PostParser.js");
var hpP1606dn = require("./HP-P1606dnParser.js");

var parseRicoh242File = function (fullPath) {
   return ricoh242.parseMain(fullPath);
};

var parseRicoh252File = function (fullPath) {
   return ricoh252.parseMain(fullPath);
};

var parseRicoh3400File = function (fullPath) {
   return ricoh3400.parseMain(fullPath);
};

var parseRicoh3500File = function (fullPath) {
   return ricoh3500.parseMain(fullPath);
};

var parseRicoh3600File = function (fullPath) {
   return ricoh3600.parseTopPage(fullPath);
};

var parseHP_P1606dnFile = function (fullPath) {
   return hpP1606dn.parseDeviceStatusPage(fullPath);
};

// these are more or less for testing
exports.parseRicoh242File = parseRicoh242File; 
exports.parseRicoh252File = parseRicoh252File; 
exports.parseRicoh3400File = parseRicoh3400File; 
exports.parseRicoh3500File = parseRicoh3500File; 
exports.parseRicoh3600File = parseRicoh3600File; 
exports.parseHP_P1606dnFile = parseHP_P1606dnFile; 


exports.getTonerStatusRicoh242 = ricoh242.getTonerStatus;
exports.getTonerStatusRicoh252 = ricoh252.getTonerStatus;
exports.getTonerStatusRicoh3400 = ricoh3400.getTonerStatus;
exports.getTonerStatusRicoh3500 = ricoh3500.getTonerStatus;
exports.getTonerStatusRicoh3600 = ricoh3600.getTonerStatus;
exports.getTonerStatusHP_P1606dn = hpP1606dn.getTonerStatus;
