var mongoose = require('mongoose');


// the studentInstallOption controls what will be installed on the student computers
// in the room by an automated process that retrieves this data.
// yes: will delete any printers and install printer specified
// no:  will delete any printers
// manual: will neither install or delete printers
// null: no entry will be like "manual".  No action will be taken.


var printerSchema = new mongoose.Schema( {
  MACaddress:           {type: String, required: true, index: true},
  IPaddress:            {type: String, required: true},
  printerModel:         {type: String, required: true},
  room:                 {type: String, required: true},
  tagNumber:            {type: String, required: false},
  studentInstallOption: {type: String, required: false}, // yes, no, manual
  comment:              {type: String, required: false}
});

// not sure if I need any other indexes
//printerSchema.index({release: 1, hostName: 1});
printerSchema.set('autoIndex', false);

mongoose.model('printer', printerSchema);
