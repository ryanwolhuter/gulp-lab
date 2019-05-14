const gulp = require('gulp');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');

function copy() {
  return gulp.src([
    'app/*.html',
    'app/**/*.jpg',
  ])
    .pipe(gulp.dest('build'));
}

gulp.task('copy', copy);

function serve() {
  return browserSync.init({
    server: 'build',
    open: false,
    port: 3000
  });
}

function processJs() {
  return gulp.src('app/scripts/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/scripts'));
}

gulp.task('processJs', processJs);

function processCss() {
  return gulp.src('app/styles/*.css')
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/styles'));
}

gulp.task('processCss', processCss);

function watch() {
  gulp.watch('app/scripts/*.js', processJs);
}

gulp.task('watch', watch);

gulp.task('buildAndServe', gulp.series(copy, serve));