const browserSync = require('browser-sync');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');

gulp.task('stylus-with-postcss', function () {
  return gulp.src('src/**/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus(stylus({
      compress: true
    })))
    .pipe(postcss([
      postcssPresetEnv({browsers: 'last 2 versions'})
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: './'
    },
    notify: false
  });
});

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('src/**/*.styl', ['stylus-with-postcss']);
  gulp.watch('./index.html', browserSync.reload);
  browserSync.reload();
  gulp.watch('dist/**/*.css', browserSync.reload);
  browserSync.reload();
});