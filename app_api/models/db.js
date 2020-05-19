
var mysql = require('mysql');


console.log("Attempting to connect to mysql db");

if (! process.env.DB_HOST )           { console.error("env var DB_HOST must be defined"); process.exit(1); }
if (! process.env.DB_USER )           { console.error("env var DB_USER must be defined"); process.exit(1); }
if (! process.env.DB_USER_PASSWORD )  { console.error("env var DB_USER_PASSWORD must be defined"); process.exit(1); }
if (! process.env.DB_DATABASE )       { console.error("env var DB_DATABASE must be defined"); process.exit(1); }
if (! process.env.DB_POOL_SIZE )      { console.error("env var DB_POOL_SIZE must be defined"); process.exit(1); }



var pool = mysql.createPool({
  connectionLimit : process.env.DB_POOL_SIZE,
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_DATABASE,
  dateStrings: true     // makes sure at DATE types aren't converted to DATETIME
});


gracefulShutdown = function (msg, callback) {
  pool.end();
  console.log('mysql pool ended through ' + msg);
  callback();
};

//for nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

//for app termination
process.once('SIGINT', function () {
  gracefulShutdown('SIGINT app termination', function () {
    process.exit(0);
  });
});

//for app termination
process.once('SIGTERM', function () {
  gracefulShutdown('SIGTERM app termination', function () {
    process.exit(0);
  });
});

module.exports.pool = pool;
