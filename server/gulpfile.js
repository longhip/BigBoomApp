'use strict';
var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')

gulp.task('lint-api', function () {
  gulp.src('./api/**/*.js')
    .pipe(jshint());
});

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint());
});
gulp.task('lint-root', function () {
  gulp.src('./*.js')
    .pipe(jshint());
});

gulp.task('develop', function () {
  nodemon({ script: 'server.js'
          , ext: 'html js'
          , ignore: ['ignored.js']
          , tasks: ['lint-api'] })
    .on('restart', function () {
      console.log('restarted!');
    });
});
