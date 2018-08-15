//var util = require('util');

var ricohCommon = require('./RicohCommonParser');

/*

Takes an array of values parsed from from the main.html of the
ricoh 3500 and returns an object with key/value pairs of
status information.

0 Print Cartridge
1 Remaining Level 5
2 Fusing Unit
3  
4 
                                                      	
5 Status OK
6 Transfer Roller
7  
8 


{ 'Print Cartridge': 'Remaining Level 5',
  'Fusing Unit': 'Status OK',
  'Transfer Roller': 'Status OK',
  'Paper Feed Roller': 'Status OK',
  'Tray 1': 'Status OK',
  'Tray 1 Paper Size': '8 1/2 x 11',
  'Tray 1 Paper Type': 'Plain Paper',
  'Bypass Tray': 'Out of Paper',
  'Bypass Tray Paper Size': '8 1/2 x 11',
  'Bypass Tray Paper Type': 'Plain Paper' }
*/

var postParseMain = function(settingCategory11Data) {

  var keyValuePairs = {};

  if (settingCategory11Data[0] === "Print Cartridge") {
    keyValuePairs["Print Cartridge"] = settingCategory11Data[1];
  }
  else {
    keyValuePairs["Print Cartridge"] = null;
  }

  if (settingCategory11Data[2] === "Fusing Unit") {
    keyValuePairs["Fusing Unit"] = settingCategory11Data[5];
  }
  else {
    keyValuePairs["Fusing Unit"] = null;
  }

  if (settingCategory11Data[6] === "Transfer Roller") {
    keyValuePairs["Transfer Roller"] = settingCategory11Data[9];
  }
  else {
    keyValuePairs["Transfer Roller"] = null;
  }

  if (settingCategory11Data[10] === "Paper Feed Roller") {
    keyValuePairs["Paper Feed Roller"] = settingCategory11Data[13];
  }
  else {
    keyValuePairs["Paper Feed Roller"] = null;
  }

  if (settingCategory11Data[14] === "Tray 1") {
    keyValuePairs["Tray 1"] = settingCategory11Data[16];
    keyValuePairs["Tray 1 Paper Size"] = settingCategory11Data[17];
    keyValuePairs["Tray 1 Paper Type"] = settingCategory11Data[19];
  }
  else {
    keyValuePairs["Tray 1"] = null;
    keyValuePairs["Tray 1 Paper Size"] = null;
    keyValuePairs["Tray 1 Paper Type"] = null;
  }

  if (settingCategory11Data[20] === "Bypass Tray") {
    keyValuePairs["Bypass Tray"] = settingCategory11Data[22];
    keyValuePairs["Bypass Tray Paper Size"] = settingCategory11Data[23];
    keyValuePairs["Bypass Tray Paper Type"] = settingCategory11Data[25];
  }
  else {
    keyValuePairs["Tray 1"] = null;
    keyValuePairs["Bypass Tray Paper Size"] = null;
    keyValuePairs["Bypass Tray Paper Type"] = null;
  }


  return keyValuePairs;
};


var parseMain = function (fullPath) {
   return postParseMain(ricohCommon.parseMain(fullPath));
};

exports.parseMain = parseMain;

exports.getTonerStatus = function (fullPath) {
   return getNormalizedTonerStatus(fullPath);
};

var getNormalizedTonerStatus = function(fullPath) {

  var mainKeyValuePairs = parseMain(fullPath);
  var tonerStatus = [];
  var blackDetails = {};

  if (mainKeyValuePairs['Print Cartridge']) {
    blackDetails['color'] = 'Black';
    blackDetails['nativeValue'] = mainKeyValuePairs['Print Cartridge'];
    blackDetails['percentFull'] = ricohCommon.nativeTonerStatusToPercent(mainKeyValuePairs['Print Cartridge']);
  }
  tonerStatus.push(blackDetails);

  return tonerStatus;
};

