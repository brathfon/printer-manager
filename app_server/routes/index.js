var express = require('express');
var router = express.Router();

var ctrPrinterMonitor = require('../controllers/printerManager');

router.get('/', ctrPrinterMonitor.reports);

module.exports = router;
