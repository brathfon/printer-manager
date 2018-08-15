var express = require('express');
var router = express.Router();

var ctrlPrinterMonitor = require('../controllers/printerMonitor');

router.get('/ack', ctrlPrinterMonitor.ack);
router.get('/getTonerStatuses', ctrlPrinterMonitor.getTonerStatuses);


module.exports = router;
