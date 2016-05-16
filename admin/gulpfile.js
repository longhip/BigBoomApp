'use strict';
var gulp = require('gulp'),
    connect = require('gulp-connect'),
	  gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean');

gulp.task('develop', function() {
    connect.server({
        root: '.',
    });
});

// JSHint task
gulp.task('lint', function() {
  gulp.src(['./core/*.js', './core/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Browserify task
gulp.task('build vendor', function() {
  gulp.src(['./bundle.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
});

gulp.task('build bundle', function() {
  gulp.src(['./vendor.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundle.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
});

gulp.task('watch', ['lint'], function() {
  // gulp.watch(['./core/*.js', './core/**/*.js'],[
  //   'lint',
  //   'browserify'
  // ]);
});

gulp.task('default', ['connect']);
