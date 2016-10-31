var babelify       = require('babelify');             // Used to convert ES6 & JSX to ES5
var browserify     = require('browserify');           // Providers "require" support, CommonJS
var buffer         = require('vinyl-buffer');         // Vinyl stream support
var duration       = require('gulp-duration');        // Time aspects of your gulp process
var gulp           = require('gulp');                 // Base gulp package
var gutil          = require('gulp-util');            // Provides gulp utilities, including logging and beep
var notify         = require('gulp-notify');          // Provides notification to both the console and Growel
var merge          = require('utils-merge');          // Object merge tool
var rename         = require('gulp-rename');          // Rename sources
var source         = require('vinyl-source-stream');  // Vinyl stream support
var sourcemaps     = require('gulp-sourcemaps');      // Provide external sourcemap files
var stringify      = require('stringify');            // Require text files like templates
var watchify       = require('watchify');             // Watchify for source changes

var mapError       = require('../error');

var config = {
  src: 'src/main.js',
  outputDir: './www/assets/js',
  outputFile: 'build.js',
};


gulp.task('browserify', function() {
  var bundler = watchify(browserify(config.src, watchify.args));
  bundler
    .transform(stringify,{ appliesTo: { includeExtensions: ['.html'] }, minify: true })
    .transform(babelify, { presets: ['es2015'] })

  function rebundle() {
    var bundleTimer = duration('Javascript bundle time');

    bundler
      .bundle()
      .on('error', mapError)                   // Map error reporting
      .pipe(source('main.js'))                 // Set source name
      .pipe(buffer())                          // Convert to gulp pipeline
      .pipe(rename(config.outputFile))      // Rename the output file
      .pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
      .pipe(sourcemaps.write('./map'))         // Set folder for sourcemaps to output to
      .pipe(gulp.dest(config.outputDir))    // Set the output folder
      .pipe(notify({
        onLast: true,
        message: 'Generated file: <%= file.relative %>',
      }))                                      // Output the file being created
      .pipe(bundleTimer)                       // Output time timing of the file creation
  }
  bundler.on('update', function() {
    rebundle();
  });

  return rebundle();
});