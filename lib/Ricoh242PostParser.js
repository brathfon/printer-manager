
//var util = require('util');

var ricohCommon = require('./RicohCommonParser');


/*
Parse the main.html page for a Ricoh color printer model 252

Input: list of properties of the printer from the main.html page:
0 Black
1 Remaining Level 3
2 Magenta
3 Remaining Level 5
4 Yellow
5 Remaining Level 5
6 Cyan
7 Remaining Level 5
8 Waste Toner Bottle
......

Returns object where the key is the name of the item and the value is the status.: 

{ Black: 'Remaining Level 3',
  Magenta: 'Remaining Level 5',
  Yellow: 'Remaining Level 5',
  Cyan: 'Remaining Level 5',
  'Waste Toner Bottle': 'Status OK',
  'Intermediate Transfer Unit': 'Status OK',
  'Transfer Roller': 'Status OK',
  'Tray 1': 'Status OK',
  'Tray 1 Paper Size': '8 1/2 x 11',
  'Tray 1 Paper Type': 'Middle Thick Paper (75-90g/m2)',
  'Bypass Tray': 'Out of Paper',
  'Bypass Tray Paper Size': '8 1/2 x 11',
  'Bypass Tray Paper Type': 'Middle Thick Paper (75-90g/m2)' }
*/

var postParseMain = function(settingCategory11Data) {

  var keyValuePairs = {};

  if (settingCategory11Data[0] === "Black") {
    keyValuePairs["Black"] = settingCategory11Data[1];
  }
  else {
    keyValuePairs["Black"] = null;
  }

  if (settingCategory11Data[2] === "Magenta") {
    keyValuePairs["Magenta"] = settingCategory11Data[3];
  }
  else {
    keyValuePairs["Magenta"] = null;
  }

  if (settingCategory11Data[4] === "Yellow") {
    keyValuePairs["Yellow"] = settingCategory11Data[5];
  }
  else {
    keyValuePairs["Yellow"] = null;
  }
  
  if (settingCategory11Data[6] === "Cyan") {
    keyValuePairs["Cyan"] = settingCategory11Data[7];
  }
  else {
    keyValuePairs["Cyan"] = null;
  }
  
  if (settingCategory11Data[8] === "Waste Toner Bottle") {
    keyValuePairs["Waste Toner Bottle"] = settingCategory11Data[11];
  }
  else {
    keyValuePairs["Waste Toner Bottle"] = null;
  }
  
  if (settingCategory11Data[12] === "Intermediate Transfer Unit") {
    keyValuePairs["Intermediate Transfer Unit"] = settingCategory11Data[15];
  }
  else {
    keyValuePairs["Intermediate Transfer Unit"] = null;
  }
  
  
  if (settingCategory11Data[20] === "Transfer Roller") {
    keyValuePairs["Transfer Roller"] = settingCategory11Data[23];
  }
  else {
    keyValuePairs["Transfer Roller"] = null;
  }
  
  if (settingCategory11Data[24] === "Tray 1") {
    keyValuePairs["Tray 1"] = settingCategory11Data[26];
    keyValuePairs["Tray 1 Paper Size"] = settingCategory11Data[27];
    keyValuePairs["Tray 1 Paper Type"] = settingCategory11Data[29];
  }
  else {
    keyValuePairs["Tray 1"] = null;
    keyValuePairs["Tray 1 Paper Size"] = null;
    keyValuePairs["Tray 1 Paper Type"] = null;
  }
  
  if (settingCategory11Data[30] === "Bypass Tray") {
    keyValuePairs["Bypass Tray"] = settingCategory11Data[32];
    keyValuePairs["Bypass Tray Paper Size"] = settingCategory11Data[33];
    keyValuePairs["Bypass Tray Paper Type"] = settingCategory11Data[35];
  }
  else {
    keyValuePairs["Tray 1"] = null;
    keyValuePairs["Bypass Tray Paper Size"] = null;
    keyValuePairs["Bypass Tray Paper Type"] = null;
  }

  return keyValuePairs;
};



var parseMain = function (pathWithDate) {
   return postParseMain(ricohCommon.parseMain(pathWithDate));
};

exports.parseMain = parseMain;

exports.getTonerStatus = function (pathWithDate) {
   return getNormalizedTonerStatus(pathWithDate);
};



var getNormalizedTonerStatus = function(pathWithDate) {

  var mainKeyValuePairs = parseMain(pathWithDate);
  var tonerStatus = [];
  var blackDetails = {};
  var magentaDetails = {};
  var yellowDetails = {};
  var cyanDetails = {};

  if (mainKeyValuePairs['Black']) {
    blackDetails['color'] = 'Black';
    blackDetails['nativeValue'] = mainKeyValuePairs['Black'];
    blackDetails['percentFull'] = ricohCommon.nativeTonerStatusToPercent(mainKeyValuePairs['Black']);
  }
  tonerStatus.push(blackDetails);

  if (mainKeyValuePairs['Magenta']) {
    magentaDetails['color'] = 'Magenta';
    magentaDetails['nativeValue'] = mainKeyValuePairs['Magenta'];
    magentaDetails['percentFull'] = ricohCommon.nativeTonerStatusToPercent(mainKeyValuePairs['Magenta']);
  }
  tonerStatus.push(magentaDetails);
 
  if (mainKeyValuePairs['Yellow']) {
    yellowDetails['color'] = 'Yellow';
    yellowDetails['nativeValue'] = mainKeyValuePairs['Yellow'];
    yellowDetails['percentFull'] = ricohCommon.nativeTonerStatusToPercent(mainKeyValuePairs['Yellow']);
  }
  tonerStatus.push(yellowDetails);
 
  if (mainKeyValuePairs['Cyan']) {
    cyanDetails['color'] = 'Cyan';
    cyanDetails['nativeValue'] = mainKeyValuePairs['Cyan'];
    cyanDetails['percentFull'] = ricohCommon.nativeTonerStatusToPercent(mainKeyValuePairs['Cyan']);
  }
  tonerStatus.push(cyanDetails);
 
 
  return tonerStatus;
};
