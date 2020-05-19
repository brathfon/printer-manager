var env       = require('get-env');
var debugJson = require('debug')('app-auth:json');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


var sendTextResponse = function(res, status, content) {
  res.status(status);
  res.set('Content-Type', 'text/plain');
  res.send(content);
};


var errorObjToArray = function(obj) {
  var array = [];
  for (err in obj) {
    array.push(err + ": " + obj[err]);
  }
  return array;
}

var atob = function(text) {
  var buf = new Buffer(text, "base64");
  var bytes = [];
  for ( var i = buf.length; i >= 0; i-- ) {
    bytes[i] = String.fromCharCode(buf[i]);
  }

  return bytes.join("");
};


// Note: returnData should be passed with the return objects already set as either
// empty  arrays or null.,

var sendJsonErrorResponse = function(title, level, errorTextArray, status, returnData, res) {

    debugJson("Sending JSON of %o", errorTextArray);
    var errorMsg = {};

    // send this to the console, for sure, if dev or prod
    //console.log(chalk.red(title + ": " + util.inspect(errorTextArray, false, null)));
    // set up error to be returned for possible display
    errorMsg['title'] = title;
    errorMsg['level'] = level;
    errorMsg['text']  = [];
    if (env() === 'dev') {   // show the full error
      errorMsg['text'] = errorTextArray;
    }
    else {
      errorMsg['text'].push("Please report this error to " + process.env.WEB_MASTER_EMAIL);
    }
    returnData['errors'].push(errorMsg);

    //debugJson("in sendJsonErrorResponse just before send");
    sendJsonResponse(res, status, returnData);
};

var sendJsonSQLErrorResponse = function(title, level, sqlError, returnData, res) {

  var errorMsgArray = errorObjToArray(sqlError);
  // send SQL resonses back with the general status of 500 of a server error
  sendJsonErrorResponse(title, level, errorMsgArray, 500, returnData, res);

};

module.exports.sendTextResponse = sendTextResponse;
module.exports.sendJsonResponse = sendJsonResponse;
module.exports.sendJsonSQLErrorResponse = sendJsonSQLErrorResponse;
module.exports.sendJsonErrorResponse = sendJsonErrorResponse;
