var fs = require('fs');
//var path = require('path');
var util = require('util');
var htmlParser = require('htmlparser2');


var readInputFile = function(fullPath) {
  var contents = fs.readFileSync(fullPath, 'utf8')
  //console.log("contents: " + contents);
  return contents;
};



/*

Parses the html for Richo main.html pages and gets an array of values
whose class in "settingCategoryL11", which is where all the toner
information resides.  The returned array is like:

0 Black
1 Remaining Level 3
2 Magenta
3 Remaining Level 5
4 Yellow
5 Remaining Level 5
6 Cyan
7 Remaining Level 5
8 Waste Toner Bottle
9  
10 
                                                      	
11 Status OK
.......
*/


var parseMain = function(pathWithDate) {

  var settingCategory11Data = [];
  var insideSettingCategoryL11 = false;
  var i = 0;

  // the path passed in looks like this:
  // /Users/bill/bts/Development/school/printmonitor/scripts/results/printer_00-26-73-97-BC-E8/2016-08-24
  // -main.html is added to complete the path to the correct file
  var fullPath = pathWithDate + "-main.html";

  var parser = new htmlParser.Parser ( {
    onopentag: function(tagName, attribs) {
      //console.log("opentag name: " + tagName + " attributes: " + util.inspect(attribs, false, null));
      insideSettingCategoryL11 = false;
      if (tagName === "td" && attribs.class === "settingCategoryL11" ) {
        insideSettingCategoryL11 = true;
        //console.log("In tag of class settingCategoryL11");
      }
    },
    ontext: function(text) {
        if ( insideSettingCategoryL11 ) {
          //console.log("Inside Setting CategoryL11");
          settingCategory11Data.push(text);
        }
        //console.log("text -> " + text);
    },
    onclosetag: function (tagName) {
      insideSettingCategoryL11 = false;
      //console.log("close tag name: " + tagName)
    }
  },
  {decodeEntities: true}
  );

  parser.write(readInputFile(fullPath));
  parser.end();

/*
  for (i = 0; i < settingCategory11Data.length; ++ i) {
    console.log( i + " " + settingCategory11Data[i]);
  }
*/

  return settingCategory11Data;

};

exports.parseMain = parseMain;

var nativeTonerStatusToPercent = function(status) {

  var percent = 0;

  switch (status) {
    case "Remaining Level 5":
      percent = 100;
      break;
    case "Remaining Level 4":
      percent = 80;
      break;
    case "Remaining Level 3":
      percent = 60;
      break;
    case "Remaining Level 2":
      percent = 40;
      break;
    case "Toner Almost Empty":
      percent = 20;
      break;
    case "Cartridge Almost Empty":
      percent = 20;
      break;
    case "Replace Print Cartridge Soon":
      percent = 10;
      break;
    case "Cartridge Empty":
      percent = 0;
      break;
    default:    // if there is a toner status not seen before, return 0 to draw attention to it
      percent = 0;
  }
  return percent;
};

exports.nativeTonerStatusToPercent = nativeTonerStatusToPercent
