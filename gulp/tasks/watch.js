var gulp = require('gulp'); // Base gulp package

var config = {
  scss: './src/scss/*'
};

gulp.task('watch', ['sass'], function() {
	gulp.watch(config.scss, ['sass']);
})