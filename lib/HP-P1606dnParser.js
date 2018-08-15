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

The HP P1606 has a pretty simple web interface.  It just displays an estimate
of the cartridge with this disclaimer:

* Approximate only; varies depending on types of documents printed and other factors.

This section of the page needs to be detected and parsed.  It is the only table of the class "mainContentArea"

        <table class="mainContentArea">^M
      <tr>^M
        <td colspan="2">^M
          Black Cartridge^M
          ^M
          ^M
                100%*^M
          ^M
^M
        </td>^M
      </tr>^M

Returns:

{ 'Black Cartridge': '100' }

*/


var parseDeviceStatusPage = function(pathWithDate) {

  var insideMainContentArea = false;
  var insideRow = false;
  var insideColumn = false;

  var keyValuePairs = {};

  // the path passed in looks like this:
  // /Users/bill/bts/Development/school/printmonitor/scripts/results/printer_00-26-73-97-BC-E8/2016-08-24
  // -device-status.html is added to complete the path to the correct file
  var fullPath = pathWithDate + "-device-status.html";

  var parser = new htmlParser.Parser ( {
    onopentag: function(tagName, attribs) {
      //console.log("opentag name: " + tagName + " attributes: " + util.inspect(attribs, false, null));
      if (tagName === "table" && attribs.class === "mainContentArea" ) {
        insideMainContentArea = true;
        //console.log("In table tag of class mainContentArea");
      }
      else if (insideMainContentArea && tagName === "tr" ) {
        insideRow = true;
        //console.log("In table tag of class mainContentArea and row");
      }
      else if (insideMainContentArea && insideRow && tagName === "td" ) {
        insideColumn = true;
        //console.log("In table tag of class mainContentArea, row and column");
      }
    },
    ontext: function(text) {    // don't do anything with text for this printer
        if (insideMainContentArea && insideRow && insideColumn) {
          //console.log("text -> " + text);
          var str = text.replace("%", "").replace("*", "").replace("Black Cartridge", "").trim();
          keyValuePairs["Black Cartridge"] = str;
          //console.log("results -> " + str);
          // strip off the white space
          
        }
    },
    onclosetag: function (tagName) {
      //console.log("close tag name: " + tagName)
      if (insideMainContentArea && insideRow && insideColumn && tagName === "td" ) {
        insideMainContentArea = false;
        insideRow = false;
        insideColumn = false;
      }
    }
  },
  {decodeEntities: true}
  );

  parser.write(readInputFile(fullPath));
  parser.end();

  return keyValuePairs;

};

exports.parseDeviceStatusPage = parseDeviceStatusPage;

exports.getTonerStatus = function (fullPath) {
   return getNormalizedTonerStatus(fullPath);
};

var getNormalizedTonerStatus = function(fullPath) {

  var deviceStatuseyValuePairs = parseDeviceStatusPage(fullPath);
  var tonerStatus = [];
  var blackDetails = {};

  if (deviceStatuseyValuePairs['Black Cartridge']) {
    blackDetails['color'] = 'Black';
    blackDetails['nativeValue'] = deviceStatuseyValuePairs['Black Cartridge'] + "%";
    blackDetails['percentFull'] = Math.round((deviceStatuseyValuePairs['Black Cartridge'] / 100) * 100);
  }
  tonerStatus.push(blackDetails);

  return tonerStatus;
};

