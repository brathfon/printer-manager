var util = require('util');

var printerMonitorLib  = require('../../lib/printerMonitorData.js')

// will need to change this
var debug = require("../../lib/printerMonitorDebug");


var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.ack = function (req, res) {
  debug.log("ack request");
  var ackResponse = 'hi-from-printerMonitor';
  sendJsonResponse(res, 201, ackResponse);
};


module.exports.getTonerStatuses = function (req, res) {
  debug.log("calling getTonerStatuses");
  sendJsonResponse(res, 201, printerMonitorLib.getTonerStatuses());
};
