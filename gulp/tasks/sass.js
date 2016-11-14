var autoprefixer = require('gulp-autoprefixer'); // Auto prefixer for css
var gulp         = require('gulp');              // Base gulp package
var minify       = require('gulp-minify-css');   // Minify CSS
var notify       = require('gulp-notify');       // Provides notification to both the console and Growel
var rename       = require('gulp-rename');       // Rename sources
var sass         = require('gulp-sass');         // Used to build sass files
var sourcemaps   = require('gulp-sourcemaps');   // Provide external sourcemap files

var mapError     = require('../error');

var config = {
  src: './src/scss/main.scss',
  outputDir: './www/assets/css',
  outputFile: 'style.css'
};

gulp.task('sass', function() {

  return gulp.src(config.src)
    .pipe(sourcemaps.init({ loadMaps: true })) // Extract the inline sourcemaps
    .pipe(sass())
    .on('error', mapError)
    .pipe(rename(config.outputFile))
    .pipe(autoprefixer())
    .pipe(minify())
    .pipe(sourcemaps.write('./'))              // Set folder for sourcemaps to output to
    .pipe(gulp.dest(config.outputDir))
    .pipe(notify({
      onLast: true,
      message: 'Generated file: <%= file.relative %>',
    }));
});