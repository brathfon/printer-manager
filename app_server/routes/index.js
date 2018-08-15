var express = require('express');
var router = express.Router();

var ctrPrinterMonitor = require('../controllers/printerMonitor');

router.get('/', ctrPrinterMonitor.reports);

module.exports = router;