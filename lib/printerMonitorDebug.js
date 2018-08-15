var chalk = require('chalk');

var debug = false;

if (process.env.DEBUG_PRINT_MONITOR === 'true') {
  console.log(chalk.blue("SETTING PRINT_MONITOR DEBUG ON"));
  debug = true;
}

module.exports.log = function(msg) {
  if (debug) {console.log(chalk.blue("PRINT_MONITOR_DEBUG: ") + msg);};
}
