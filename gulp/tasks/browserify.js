// var assign         = require('lodash.assign');
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
var uglify         = require('gulp-uglify');          //
var watchify       = require('watchify');             // Watchify for source changes

var mapError       = require('../error');

var config = {
  src: 'src/js/main.js',
  outputDir: './www/assets/js',
  outputFile: 'build.js'
};


gulp.task('browserify', function() {
  var args = merge(watchify.args, { debug: true });

  var bundler = watchify(browserify(config.src, args));
  bundler
    .transform(stringify,{ appliesTo: { includeExtensions: ['.html'] }, minify: true })
    .transform(babelify, { presets: ['es2015'] })

  function rebundle() {
    var bundleTimer = duration('Javascript bundle time');

    bundler
      .bundle()
      .on('error', mapError)                     // Map error reporting
      .pipe(notify({
        onLast: true,
        message: 'Rebuilding js...',
      }))
      .pipe(source('main.js'))                   // Set source name
      .pipe(buffer())                            // Convert to gulp pipeline
      .pipe(rename(config.outputFile))           // Rename the output file
      .pipe(sourcemaps.init({ loadMaps: true })) // Extract the inline sourcemaps
      // .pipe(uglify()) // VERY SLOW ONLY USE FOR PROD BUILD
      .pipe(sourcemaps.write('./'))           // Set folder for sourcemaps to output to
      .pipe(gulp.dest(config.outputDir))         // Set the output folder
      .pipe(notify({
        onLast: true,
        message: 'Generated file: <%= file.relative %>',
      }))                                        // Output the file being created
      .pipe(bundleTimer)                         // Output time timing of the file creation
  }
  bundler.on('update', function() {
    rebundle();
  });

  return rebundle();
});

// // add custom browserify options here
// var customOpts = {
//   entries: ['src/js/main.js'],
//   debug: true
// };
// var opts = assign({}, watchify.args, customOpts);
// var b = watchify(browserify(opts)); 

// // add transformations here
// // i.e. b.transform(coffeeify);

// gulp.task('browserify', bundle); // so you can run `gulp js` to build the file
// b.on('update', bundle); // on any dep update, runs the bundler
// b.on('log', gutil.log); // output build logs to terminal

// function bundle() {
//   gutil.log('lou');
//   var a = b.bundle()
//     .on('error', gutil.log.bind(gutil, 'Browserify Error')) // log errors if they happen
//     .pipe(source('main.js'))
//     .pipe(buffer()) // optional, remove if you don't need to buffer file contents
//     .pipe(sourcemaps.init({loadMaps: true})) // optional, remove if you dont want sourcemaps, oads map from browserify file
//      // Add transformation tasks to the pipeline here.
//     .pipe(sourcemaps.write('./')) // writes .map file
//     .pipe(gulp.dest('./www/assets/js'));
//   gutil.log('jkljkl');
//   return a;
// }