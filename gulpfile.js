var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('default', function() {
  gulp.src('app/')
    .pipe(webserver({
      livereload: false,
      directoryListing: false,
      open: true,
      fallback: "index.html"
    }));
});
