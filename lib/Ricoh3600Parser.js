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


The Ricoh 3600 status web page is quite different than the other, older models.  The
% of toner still available is just the length of a gif horizontal bar being drawn.
The length at 100% is 162 pixels.  As the toner goes down, the length is a fraction
of that 162.  For example, 90% is 145 pixels.  The url for the page for this information
is -topPage.html.  There are 2 other bits of information on that page, the Drum Unit
wear and tear (a guess) and the Maintence Kit, whatever that is.  They are measured
in the same fashion, so also parsed, but not currently used.

Each section for 

<dt class="clear">Toner</dt>^M
</dl>^M
<dl class="mgn-T10px">^M
        <dt class="machineIndent mgn-T10px">^M
                Black^M
        </dt>^M
        <dd class="stateMachine">^M
                <div class="float-l catchIcon"><img src="image/deviceStToner_16.gif" alt="" width="16" height="16" class="ver-algn-m" /></div>^M
^M
                <div class="tonerAreaTop">^M
                        <div class="unit0Top">0</div>^M
                        <div class="unit50Top">50</div>^M
                        <div class="unit100Top">100</div>^M
                        <img src="image/deviceStTnBarK.gif" alt="" width="145" height="21" class="bdr-1px-666" /></div>^M
....


Returns:

{ 'Print Cartridge': '145',
  'Drum Unit': '162',
  'Maintence Kit': '162' }

*/


var parseTopPage = function(pathWithDate) {

  var insideTonerAreaTop = false;
  var foundStatusBarWidth = false;
  var tonerAreaTopCount = 0;
  var statusBarWidth = 0;  // will return something low to draw attention if there is a problem

  var keyValuePairs = {};

  // the path passed in looks like this:
  // /Users/bill/bts/Development/school/printmonitor/scripts/results/printer_00-26-73-97-BC-E8/2016-08-24
  // -topPage.html is added to complete the path to the correct file
  var fullPath = pathWithDate + "-topPage.html";

  var parser = new htmlParser.Parser ( {
    onopentag: function(tagName, attribs) {
      //console.log("opentag name: " + tagName + " attributes: " + util.inspect(attribs, false, null));
      if (tagName === "div" && attribs.class === "tonerAreaTop" ) {
        ++ tonerAreaTopCount;
        insideTonerAreaTop = true;
        //console.log("In tag of class tonerAreaTop");
      }
      else if (insideTonerAreaTop && tagName === "img") {
        //console.log("In tag of class tonerAreaTop and found the image tag");
        statusBarWidth = attribs.width;
        foundStatusBarWidth = true;
        //console.log("found status bar width of : " + statusBarWidth);
        if (tonerAreaTopCount === 1) {
           //console.log("Found toner status bar width of " + statusBarWidth);
           keyValuePairs["Toner"] = statusBarWidth;
        }
        else if (tonerAreaTopCount === 2) {
           //console.log("Found drum unit status bar width of " + statusBarWidth);
           keyValuePairs["Drum Unit"] = statusBarWidth;
        }
        else if (tonerAreaTopCount === 3) {
           //console.log("Found maintenance status bar width of " + statusBarWidth);
           keyValuePairs["Maintence Kit"] = statusBarWidth;
        }
        else {
           //console.log("ERROR: Found more than 3 tonerAreaTop tags.");
        }
        insideTonerAreaTop = false;  // we are looking for the img, so we are done
        
      }
    },
    ontext: function(text) {    // don't do anything with text for this printer
        //console.log("text -> " + text);
    },
    onclosetag: function (tagName) {
      //console.log("close tag name: " + tagName)
    }
  },
  {decodeEntities: true}
  );

  parser.write(readInputFile(fullPath));
  parser.end();

  return keyValuePairs;

};

exports.parseTopPage = parseTopPage;

exports.getTonerStatus = function (fullPath) {
   return getNormalizedTonerStatus(fullPath);
};

var getNormalizedTonerStatus = function(fullPath) {

  var mainKeyValuePairs = parseTopPage(fullPath);
  var tonerStatus = [];
  var blackDetails = {};

  if (mainKeyValuePairs['Toner']) {
    blackDetails['color'] = 'Black';
    blackDetails['nativeValue'] = mainKeyValuePairs['Toner'] + "/162";
    blackDetails['percentFull'] = Math.round((mainKeyValuePairs['Toner'] / 162) * 100);
  }
  tonerStatus.push(blackDetails);

  return tonerStatus;
};

