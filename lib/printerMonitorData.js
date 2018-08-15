var fs = require('fs');
var path = require('path');
var util = require('util');
var printerMonitorParser = require('./printerMonitorParser.js');

var ourPrinterMonitorDirectory = "/Users/sysmon/bin/printermonitor-collection-scripts/results";

if (process.env.PRINTER_MONITOR_DIRECTORY) {
  ourPrinterMonitorDirectory = process.env.PRINTER_MONITOR_DIRECTORY;
  console.log("Setting ourPrinterMonitorDirectory to " + ourPrinterMonitorDirectory);
}
else {
  console.log("PRINTER_MONITOR_DIRECTORY is not defined.  Using default of " + ourPrinterMonitorDirectory);
}

var ourPrinterMonitorInfoFile = "/Users/sysmon/bin/printermonitor-collection-scripts/printerInfo.txt";

if (process.env.PRINTER_MONITOR_INFO_FILE) {
  ourPrinterMonitorInfoFile = process.env.PRINTER_MONITOR_INFO_FILE;
  console.log("Setting ourPrinterMonitorInfoFile to " + ourPrinterMonitorInfoFile);
}
else {
  console.log("PRINTER_MONITOR_INFO_FILE is not defined.  Using default of " + ourPrinterMonitorInfoFile);
}



/*
Reads the lines from the Info File and returns a list of objects
In:

00-14-38-4A-23-89	10.177.200.10	HP-Color-LaserJet-3600	OPT	e104
00-26-73-12-D4-52	10.177.200.11	Ricoh-SP3400N	OPT	c103
00-26-73-12-C5-91	10.177.200.12	Ricoh-SP3400N	OPT	c202

out:
[ { MACaddress: '00-14-38-4A-23-89',
    IPaddress: '10.177.200.10',
    printerModel: 'HP-Color-LaserJet-3600',
    tagNumber: 'OPT',
    room: 'e104' },
  { MACaddress: '00-26-73-12-D4-52',
    IPaddress: '10.177.200.11',
    printerModel: 'Ricoh-SP3400N',
    tagNumber: 'OPT',
    room: 'c103' },
  { MACaddress: '00-26-73-12-C5-91',
    IPaddress: '10.177.200.12',
    printerModel: 'Ricoh-SP3400N',
    tagNumber: 'OPT',
    room: 'c202' },
*/

var readPrinterInfoFile = function() {
  var lineList = [];
  var lines;
  var contents = fs.readFileSync(ourPrinterMonitorInfoFile, 'utf8')
  //console.log("contents: " + contents);
  lines = contents.split("\n");
  lines.forEach( function (line) {
      //console.log("line: " + line);
      pieces = line.split("\t");
      if (pieces.length === 5) {
        obj = {};
        obj["MACaddress"] = pieces[0];
        obj["IPaddress"] = pieces[1];
        obj["printerModel"] = pieces[2];
        obj["tagNumber"] = pieces[3];
        obj["room"] = pieces[4];
        lineList.push(obj);
      }
    });
  return lineList;
};


exports.readPrinterInfoFile = readPrinterInfoFile;

/* gets the date of the last date for this printer that had a successful ping
starts at the end of the simple list of files so it is looking at the most
recent and traverses backwards check agains the organized filesByDate object until
it finds the most recent file with a good ping ping.
*/

var findLastPingOKDate = function(fileList, filesByDate) {
    
  var i;
  var foundIt = false;
  filesByDate["lastPingOKDate"] = null;
  for (i = fileList.length - 1; i >= 0; --i) {
    var pieces = fileList[i].split("-");
    var date = pieces[0] + "-" + pieces[1] + "-" + pieces[2];
    if (filesByDate[date].pingOK) {
      filesByDate["lastPingOKDate"] = date;
      break;
    }
  }
};


/*
Takes a simple list of files for a printer and them into objects with the key begin the date
and the data being an object with a list of files and a ping status.

'2016-08-06': { files: [ '2016-08-06-PING-FAILED.txt' ], pingOK: false },
       '2016-08-07': { files: [ '2016-08-07-PING-FAILED.txt' ], pingOK: false },
       '2016-08-08': 
        { files: 
           [ '2016-08-08-counter.html',
             '2016-08-08-machine-info.html',
             '2016-08-08-main.html',
             '2016-08-08-network-settings.html' ],
          pingOK: true },
  
*/

var organizeByDate = function(fileList) {

   var returnObj = {};

   fileList.forEach(function(fileName) {
     var pieces = fileName.split("-");
     var date = pieces[0] + "-" + pieces[1] + "-" + pieces[2];
     if (! returnObj[date]) {
       returnObj[date]  = {};
     }
     var obj = returnObj[date];
     if ( ! obj["files"]) { 
       obj["files"] = [];
     }
     obj["files"].push(fileName);
     if (fileName.indexOf("PING-FAILED") >= 0) {
       obj["pingOK"] = false;
     }
     else {
       obj["pingOK"] = true;
     }
       
   });
   return returnObj;
}

/*
This gets the names of the printer directories, which are in the form:
printer_00-00-74-A9-4D-B7	printer_00-26-73-53-89-55	printer_00-26-73-76-38-C2
printer_00-26-73-12-C5-91	printer_00-26-73-68-92-A5	printer_00-26-73-88-86-B5
*/

var getPrinterMonitorDirectories = function() {
  var printerDirectories = [];
  //console.log("file length " + files.length);
  try {
     var files = fs.readdirSync(ourPrinterMonitorDirectory);
     files.map(function (file) {
         return path.join(ourPrinterMonitorDirectory, file);
     }).filter(function (file) {
         //console.log("checking directory " + file);
         return (
                  fs.statSync(file).isDirectory() &&
                  (path.basename(file).match(/^printer_/) != null)
                );
     }).forEach(function (filteredFile) {
         //var hostname = path.basename(filteredFile).replace("\.local", "");
         //console.log("try-catch version %s (%s)", filteredFile, path.extname(filteredFile));
         var base = path.basename(filteredFile);
         printerDirectories.push(base);
     });
  } catch (err) {
     console.log("ERROR CAUGHT in getPrinterDirectories: " + err);
    return null;
  }
  return printerDirectories.sort();
}

/*
* Gets all the files in a directory that end in .txt and returns them in a list
*/

var getPrinterMonitorFilesInDirectory = function(directory) {
  var printerMonitorFiles = [];
  //console.log("file length " + files.length);
  try {
     var fullPath = path.join(ourPrinterMonitorDirectory, directory);
     //console.log("Looking for files in " + fullPath);
     var files = fs.readdirSync(fullPath);
     files.map(function (file) {
         return path.join(fullPath, file);
     }).filter(function (file) {
         //console.log("checking file " + file);
         return (
                  fs.statSync(file).isFile() &&
                  ((path.basename(file).match(/\.html$/) != null) ||
                   (path.basename(file).match(/\.txt$/) != null))
                );
     }).forEach(function (filteredFile) {
         //var hostname = path.basename(filteredFile).replace("\.local", "");
         //console.log("try-catch version %s (%s)", filteredFile, path.extname(filteredFile));
         var base = path.basename(filteredFile);
         printerMonitorFiles.push(base);
     });
  } catch (err) {
     console.log("ERROR CAUGHT IN getPrinterMonitorFilesInDirectory: " + err);
    return null;
  }
  var organizedByDate = organizeByDate(printerMonitorFiles);

  findLastPingOKDate(printerMonitorFiles, organizedByDate); 
  //return printerMonitorFiles.sort();
  //return organizedByDate.sort();
  return organizedByDate;
};


/*
  given a directory name, this function returns an object with this information for
  the directory:

{ hostDirectory: 'printer_00-00-74-A9-4D-B7',
    MACAddress: '00-00-74-A9-4D-B7',
    filesInDirectory:
     { '2016-03-24':
        { files:
           [ '2016-03-24-counter.html',
             '2016-03-24-machine-info.html',
             '2016-03-24-main.html',
             '2016-03-24-network-settings.html' ],
          pingOK: true },
       '2016-03-28':
 .....
          pingOK: true },
       lastPingOKDate: '2016-08-24' } },
*/

var getInformationForDirectory = function(printerMonitorDir) {
  var obj = {};
  var pieces = [];
  var MACaddress = "";
  //console.log("print monitor dir: " + printerMonitorDir);
  pieces = printerMonitorDir.split("_");
  MACaddress = pieces[1];
  var organizedByDate =  getPrinterMonitorFilesInDirectory(printerMonitorDir);
  var obj = {hostDirectory: printerMonitorDir, MACAddress: MACaddress, filesInDirectory: organizedByDate};
  return obj;
};

/*
Gets information about about each host, but not information from the printerMonitor file itself
Will return an object with be a list of objects, with the key being a host name and
the value being a list of all the printerMonitor report file names in that directory.
*/

var getHighLevelInformation = function() {
  var returnList = [];
  var hostDirectories = getPrinterMonitorDirectories();
  var pieces = [];
  var MACaddress = "";
  hostDirectories.forEach(function (printerMonitorDir) {
     //console.log("print monitor dir: " + printerMonitorDir);
     returnList.push(getInformationForDirectory(printerMonitorDir));
  });
  return returnList;
};


exports.getHighLevelInformation = getHighLevelInformation;


/* returns an object with this data:

{ room: 'c103',
    MACaddress: '00-26-73-12-D4-52',
    IPaddress: '10.177.200.11',
    printerModel: 'Ricoh-SP3400N',
    statusDate: '2016-12-05',
    tonerStatus: { Black: { nativeValue: 'Remaining Level 3', percentFull: 60 } } }

    if there is no valid data, statusDate will be "none found" and tonerStatus will be null
*/


var getTonerStatusForPrinter = function(printerInfo, parserFunction) {
     var fullPath = path.join(ourPrinterMonitorDirectory, "printer_" + printerInfo.MACaddress);
     var filesInfo = getInformationForDirectory("printer_" + printerInfo.MACaddress);
     var tonerData = null;
     var tonerStatus = {};
     var lastValidPingDate = "";  // will remain blank if no files are found
     // if there are no files collected yet, filesInfo.filesInDirectory will be null, so test for that
     if (filesInfo.filesInDirectory && filesInfo.filesInDirectory.lastPingOKDate) {
       lastValidPingDate = filesInfo.filesInDirectory.lastPingOKDate;
       tonerData = parserFunction(fullPath + "/" + filesInfo.filesInDirectory.lastPingOKDate);
       tonerStatus["parsingStatus"] = "successful";
     }
     else {
       tonerStatus["parsingStatus"] = "no files found";
       console.log("ERROR: no valid collect data to parse for printer " + util.inspect(printerInfo, false, null));
     }
     //console.log("fullPath = " + fullPath);
     //console.log(util.inspect(printerInfo, false, null));
     //console.log(util.inspect(filesInfo, false, null));
     //console.log(util.inspect(tonerData, false, null));

     tonerStatus["room"] = printerInfo.room;
     tonerStatus["MACaddress"] = printerInfo.MACaddress;
     tonerStatus["IPaddress"] = printerInfo.IPaddress;
     tonerStatus["printerModel"] = printerInfo.printerModel;
     tonerStatus["statusDate"] = lastValidPingDate;
     tonerStatus["tonerStatus"] = tonerData;
     
     return tonerStatus;
};


// this function if for returning something not very complete for a printer that has no
// parser implemented for it yet.

var getTonerStatusForNonParsingPrinter = function(printerInfo) {
     var fullPath = path.join(ourPrinterMonitorDirectory, "printer_" + printerInfo.MACaddress);
     var filesInfo = getInformationForDirectory("printer_" + printerInfo.MACaddress);
     var tonerData = null;
     var tonerStatus = {};
     var lastValidPingDate = "";
     // if there are no files collected yet, filesInfo.filesInDirectory will be null, so test for that
     if (filesInfo.filesInDirectory && filesInfo.filesInDirectory.lastPingOKDate) {
       lastValidPingDate = filesInfo.filesInDirectory.lastPingOKDate;
     }
     //else {
       //console.log("ERROR: no valid collect data for non parsing for printer " + util.inspect(printerInfo, false, null));
     //}
     //console.log("fullPath = " + fullPath);
     //console.log(util.inspect(printerInfo, false, null));
     //console.log(util.inspect(filesInfo, false, null));
     //console.log(util.inspect(tonerData, false, null));

     tonerStatus["room"] = printerInfo.room;
     tonerStatus["parsingStatus"] = "do not parse this model";
     tonerStatus["MACaddress"] = printerInfo.MACaddress;
     tonerStatus["IPaddress"] = printerInfo.IPaddress;
     tonerStatus["printerModel"] = printerInfo.printerModel;
     tonerStatus["statusDate"] = lastValidPingDate;
     tonerStatus["tonerStatus"] = tonerData;
     
     return tonerStatus;
};


var sortByRoomAscending = function(a,b) {
   if (a.room.toLowerCase() < b.room.toLowerCase())
     return -1;
   if (a.room.toLowerCase() > b.room.toLowerCase())
     return 1;
   return 0;
};


var getTonerStatuses = function () {

 var tonerStatuses = [];
 readPrinterInfoFile().forEach( function (printerInfo) {
     //console.log(util.inspect(printerInfo, false, null));
     switch (printerInfo.printerModel) {
       case 'Ricoh-SP3400N':
         tonerStatuses.push(getTonerStatusForPrinter(printerInfo, printerMonitorParser.getTonerStatusRicoh3400));
         break;
       case 'Ricoh-SP3500N':
         tonerStatuses.push(getTonerStatusForPrinter(printerInfo, printerMonitorParser.getTonerStatusRicoh3500));
         break;
       case 'Ricoh-SP3600N':
         tonerStatuses.push(getTonerStatusForPrinter(printerInfo, printerMonitorParser.getTonerStatusRicoh3600));
         break;
       case 'Ricoh-SPC242SF':
         tonerStatuses.push(getTonerStatusForPrinter(printerInfo, printerMonitorParser.getTonerStatusRicoh242));
         break;
       case 'Ricoh-SPC252SF':
         tonerStatuses.push(getTonerStatusForPrinter(printerInfo, printerMonitorParser.getTonerStatusRicoh252));
         break;
       case 'HP-LaserJet-Pro-P1606dn':
         tonerStatuses.push(getTonerStatusForPrinter(printerInfo, printerMonitorParser.getTonerStatusHP_P1606dn));
         break;
       default:
         console.log("Do not know how to parse the file for a : " + printerInfo.printerModel);
         tonerStatuses.push(getTonerStatusForNonParsingPrinter(printerInfo));
     }
   });
  return tonerStatuses.sort(sortByRoomAscending);
};

exports.getTonerStatuses = getTonerStatuses
