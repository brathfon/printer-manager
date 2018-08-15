
var mongoose = require('mongoose');

// Use bluebird
mongoose.Promise = require('bluebird');
// this assert was in the documentation, but did not seems to work.  assert was not found
// not sure why it was there, but not getting the deprecation error any more
//assert.equal(query.exec().constructor, require('bluebird'));


var dbURI = 'mongodb://localhost/printerMonitor';

// may need this later
//if (process.env.NODE_ENV === 'production') {
//   dbURI = 'mongodb://loc8ruser:wildbill@ds015584.mlab.com:15584/heroku_8qx2w1bk';
//}

console.log("Attempting to connect to dbURI : " + dbURI);
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI );
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error ' + err );
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

//for nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

//for app termination
process.once('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});

//for app termination
process.once('SIGTERM', function () {
  gracefulShutdown('Heroku app termination', function () {
    process.exit(0);
  });
});


require('./printerMonitor');  // schema file
