const gulp = require('gulp');
const less = require('gulp-less');
const plumberNotifier = require('gulp-plumber-notifier');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cleanss = require('gulp-cleancss');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();


// LESS compile
gulp.task('less', function () {
  return gulp.src('./src/less/style.less')
    .pipe(plumberNotifier())
    .pipe(less())
    .pipe(postcss([
        autoprefixer({browsers: [
          "Android 2.3",
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 10",
          "iOS >= 6",
          "Opera >= 11",
          "Safari >= 4"
          ]}),
        mqpacker ({
          sort: true
        })
    ]))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());

});

//build project
gulp.task('build', function(){
  gulp.src('./src/css/*.css')
    .pipe(cleanss())
    .pipe(gulp.dest('./build/css'));
  gulp.src('./src/*.html')
     .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true,
    }))
    .pipe(gulp.dest('./build/'));
  gulp.src(['./src/img/**/*.*', '!./src/img/sprite/*.*'])
    .pipe(gulp.dest('./build/img'));
  gulp.src('./src/js/plugins/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
  gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./build/js'));
  gulp.src('./src/svg/*.svg')
    .pipe(gulp.dest('./build/svg'));
  gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./build/fonts'));
});

// start project
gulp.task('sync', ['less'], function(){
  browserSync.init({
    server: "./src"
    });
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
  gulp.watch('src/**/*.html').on('change', browserSync.reload);
});






