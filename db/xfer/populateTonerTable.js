#!/usr/bin/env node


const  printerMonitorData = require('../../lib/printerMonitorData.js');
const  util = require('util');
const  request = require('request');
const  sleep = require('sleep');
const  fs    = require('fs');
const  path  = require('path');



//console.log("arv0 " + process.argv[0]);
//console.log("arv1 " + process.argv[1]);
//console.log("arv2 " + process.argv[2]);


//var room = process.argv[2];

console.log("");
console.log("");
console.log("");
console.log("");
console.log("Test getTonerStatusHistory()");


var mysleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};


function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}



var info = printerMonitorData.getTonerStatusHistory();

console.log(`Found ${info.length} statuses`);
/*
for (let i = 0; i < info.length; ++i) {
  console.log(util.inspect(info[i], false, null));
}
*/


var getTonerStatuses = function(req, res, data, callback){

  var apiOptions = { server: "http://localhost:3004" };
  var printerMonitorApiOptions = { server: "http://localhost:3004" };

  var path = "/api/getTonerStatuses";

  var requestOptions = {
    url: printerMonitorApiOptions.server + path,
    method: "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, tonerStatuses) {
      console.log(util.inspect(tonerStatuses, false, null));
      data["tonerStatuses"] = tonerStatuses;  // add the results to the data object
      if (callback) {
        callback(req, res, data, callback);
      }
    }
  );
};


var addColorLevel = function(req, res, postData, callback){

  var apiOptions = { server: "http://localhost:3004" };
  var printerMonitorApiOptions = { server: "http://localhost:3004" };

  var path = "/api/addColorLevel";

  var requestOptions = {
    url: printerMonitorApiOptions.server + path,
    method: "POST",
    json : postData
  };
  request(
    requestOptions,
    function(err, response, results) {
      console.log(`response ${util.inspect(postData, false, null)}`);
      console.log(`results ${util.inspect(results, false, null)}`);
      console.log(`err ${util.inspect(err, false, null)}`);
      if (callback) {
        callback(req, res, results, callback);
      }
    }
  );
};


var writeCurlCommandsFile = function (postDataList) {

  let filePath = `./curlCommands.sh`;

  let commands = ``;

  for(let i = 0; i < postDataList.length; ++i) {
    let postData = postDataList[i];
    commands += `curl -S -s --location --request POST 'http://localhost:3004/api/addColorLevel' `;
    commands += `--data-urlencode 'ip_address=${postData.ip_address}' `;
    commands += `--data-urlencode 'collect_time=${postData.collect_time}' `;
    commands += `--data-urlencode 'color=${postData.color}' `;
    commands += `--data-urlencode 'percent_full=${postData.percent_full}'`;
    commands += `\n`;
    commands += `echo ""\n`;
  }

  console.log(`Writing file to ${filePath}`);


  fs.writeFileSync(filePath, commands, function(err) {
    if(err) {
        console.error(`ERROR writing ${filePath}`);
        console.log(`ERROR writing ${filePath}`);
        console.error(err);
        return console.log(err);
    }
    console.log("The file was saved to " + filePath);
  });
};


var writeCurlCommandsFileSim15Minutes = function (postDataList) {

  let filePath = `./curlCommandsSim15Minutes.sh`;

  let commandCount = 0;
  let commands = ``;

  let times = [];
  times.push("08:00");
  times.push("08:15");
  times.push("08:30");
  times.push("08:45");
  times.push("09:00");
  times.push("09:15");
  times.push("09:30");
  times.push("09:45");
  times.push("10:00");
  times.push("10:15");
  times.push("10:30");
  times.push("10:45");
  times.push("11:00");
  times.push("11:15");
  times.push("11:30");
  times.push("11:45");
  //times.push("12:00");  going to skip this to allow for timing test of inserting all the 12:00 after the others are inserted
  times.push("12:15");
  times.push("12:30");
  times.push("12:45");
  times.push("13:00");
  times.push("13:15");
  times.push("13:30");
  times.push("13:45");
  times.push("14:00");
  times.push("14:15");
  times.push("14:30");
  times.push("14:45");
  times.push("15:00");

  for(let i = 0; i < postDataList.length; ++i) {
    for(let timeIndex = 0; timeIndex < times.length; ++timeIndex) {


      let postData = postDataList[i];
      let newCollectTime = postData.collect_time.replace("12:00", times[timeIndex]);

      commands += `curl -S -s --location --request POST 'http://localhost:3004/api/addColorLevel' `;
      commands += `--data-urlencode 'ip_address=${postData.ip_address}' `;
      commands += `--data-urlencode 'collect_time=${newCollectTime}' `;
      commands += `--data-urlencode 'color=${postData.color}' `;
      commands += `--data-urlencode 'percent_full=${postData.percent_full}'`;
      commands += `\n`;
      commands += `echo ""\n`;
      ++commandCount;
    }
  }

  console.log(`Writing file to ${filePath} with ${commandCount} curl commands`);


  fs.writeFileSync(filePath, commands, function(err) {
    if(err) {
        console.error(`ERROR writing ${filePath}`);
        console.log(`ERROR writing ${filePath}`);
        console.error(err);
        return console.log(err);
    }
    console.log("The file was saved to " + filePath);
  });
};


var writeCallAddColorLevelFile = function (postDataList) {

  let filePath = `./callAddColorLevel.sql`;

  let commands = ``;

  for(let i = 0; i < postDataList.length; ++i) {
    let postData = postDataList[i];
    commands += `call add_color_level(`;
    commands += `"${postData.ip_address}", `;
    commands += `"${postData.collect_time}", `;
    commands += `"${postData.color}", `;
    commands += `${postData.percent_full});`;
    commands += `\n`;
  }

  console.log(`Writing file to ${filePath}`);


  fs.writeFileSync(filePath, commands, function(err) {
    if(err) {
        console.error(`ERROR writing ${filePath}`);
        console.log(`ERROR writing ${filePath}`);
        console.error(err);
        return console.log(err);
    }
    console.log("The file was saved to " + filePath);
  });
};



// create postData list to send to other functions
var  createPostCommands = function () {

  let addCount = 0;
  //let sleepMs = 1000;
  //let sleepInterval = 10; // how many to do before sleeping

  let postDataList = [];

  for (let i = 0; i < info.length; ++i) {
    //console.log(util.inspect(info[i], false, null));
    for (let colorIndex = 0; colorIndex < info[i].tonerStatus.length; ++ colorIndex) {
      let postData = {
        ip_address: info[i].IPaddress,
        color:      info[i].tonerStatus[colorIndex].color.toLowerCase(),
        percent_full: info[i].tonerStatus[colorIndex].percentFull,
        collect_time: `${info[i].statusDate} 12:00:00`,
      };
      //console.log(`sleeping for ${sleepMs} milliseconds`);
      // old send via http stuff.  May try again later in another function
      //addColorLevel(null, null, postData, null);
      //console.log(util.inspect(postData, false, null));
      //msleep(sleepMs);  did not work
      postDataList.push(postData);
      ++ addCount;
    }
  }
  console.log(`created ${addCount} post commands`);

  return postDataList;

};

//writeCurlCommandsFile(createPostCommands());
//writeCallAddColorLevelFile(createPostCommands());
writeCurlCommandsFileSim15Minutes(createPostCommands());

