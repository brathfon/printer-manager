var express = require('express');
var router = express.Router();

var ctrlPrinterMonitor = require('../controllers/printerManager');

router.get('/ack', ctrlPrinterMonitor.ack);
router.get('/getTonerStatuses', ctrlPrinterMonitor.getTonerStatuses);
router.get('/getSnmpPrinters', ctrlPrinterMonitor.getSnmpPrinters);
router.get('/getSnmpPrintersTsv', ctrlPrinterMonitor.getSnmpPrintersTsv);

router.post('/addColorLevel', ctrlPrinterMonitor.addColorLevel);



module.exports = router;
