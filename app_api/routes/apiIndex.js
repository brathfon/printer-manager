var express = require('express');
var router = express.Router();

var ctrlPrinterManager = require('../controllers/apiPrinterManager');

router.get('/ack', ctrlPrinterManager.ack);
router.get('/getColorLevelStatuses', ctrlPrinterManager.getColorLevelStatuses);

router.get('/getSnmpPrinters', ctrlPrinterManager.getSnmpPrinters);
router.get('/getSnmpPrintersTsv', ctrlPrinterManager.getSnmpPrintersTsv);

router.post('/addColorLevel', ctrlPrinterManager.addColorLevel);



module.exports = router;
