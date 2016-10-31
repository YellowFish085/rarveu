var chalk = require('chalk');     // Allows for coloring for logging
var gutil = require('gulp-util'); // Provides gulp utilities, including logging and beep

module.exports = function(err) {
  if (err.fileName) {
    // Regular js error
    gutil.log(chalk.red(err.name)
      + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ', ' + 'Line ' + chalk.magenta(err.lineNumber)
      + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + '\n>> ' + chalk.blue(err.description));
  } else {
    // Browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message));
    gutil.log(err);
  }
}