//var util = require('util');

var ricohCommon = require('./RicohCommonParser');

/*

Takes an array of values parsed from from the main.html of the
ricoh 3400 and returns an object with key/value pairs of
status information.

Input:
0 Black Toner
1 Remaining Level 5
2 Fuser Unit
3  
4 
                                                      	
5 Status OK  ....

returned: 
{ 'Black Toner': 'Remaining Level 5',
  'Fuser Unit': 'Status OK',
  'Transfer Roller Unit': 'Status OK',
  'Paper Feed Roller Unit': 'Status OK',
  'Tray 1': 'Tray 1',
  'Tray 1 Paper Size': 'Status OK',
  'Tray 1 Paper Type': 'Letter',
  'Bypass Tray': 'Out of Paper',
  'Bypass Tray Paper Size': 'Letter',
  'Bypass Tray Paper Type': 'Plain Paper ' }
*/

var postParseMain = function(settingCategory11Data) {

  var keyValuePairs = {};

  if (settingCategory11Data[0] === "Black Toner") {
    keyValuePairs["Black Toner"] = settingCategory11Data[1];
  }
  else {
    keyValuePairs["Black Toner"] = null;
  }

  if (settingCategory11Data[2] === "Fuser Unit") {
    keyValuePairs["Fuser Unit"] = settingCategory11Data[5];
  }
  else {
    keyValuePairs["Fuser Unit"] = null;
  }

  if (settingCategory11Data[6] === "Transfer Roller Unit") {
    keyValuePairs["Transfer Roller Unit"] = settingCategory11Data[9];
  }
  else {
    keyValuePairs["Transfer Roller Unit"] = null;
  }

  if (settingCategory11Data[10] === "Paper Feed Roller Unit") {
    keyValuePairs["Paper Feed Roller Unit"] = settingCategory11Data[13];
  }
  else {
    keyValuePairs["Paper Feed Roller Unit"] = null;
  }

  if (settingCategory11Data[14] === "Tray 1") {
    keyValuePairs["Tray 1"] = settingCategory11Data[14];
    keyValuePairs["Tray 1 Paper Size"] = settingCategory11Data[16];
    keyValuePairs["Tray 1 Paper Type"] = settingCategory11Data[17];
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

  if (mainKeyValuePairs['Black Toner']) {
    blackDetails['color'] = 'Black';
    blackDetails['nativeValue'] = mainKeyValuePairs['Black Toner'];
    blackDetails['percentFull'] = ricohCommon.nativeTonerStatusToPercent(mainKeyValuePairs['Black Toner']);
  }
  tonerStatus.push(blackDetails);

  return tonerStatus;
};
