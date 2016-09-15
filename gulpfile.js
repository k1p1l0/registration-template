'use strict';

var gulp = require('gulp'); 
var autoprefixer = require('gulp-autoprefixer');
var htmlreplace = require('gulp-html-replace');
var concat = require('gulp-concat');
var styl = require('gulp-styl');  
var htmlreplace = require('gulp-html-replace');
var spritesmith = require('gulp.spritesmith');
var gulpif = require('gulp-if');
var minify = require('gulp-minify');
var rename = require('gulp-rename');

// USE DEFAULT AFTER SPRITE!
gulp.task('default', function() {
  gulp.run('minify', 'build');
});

gulp.task('build', function() {
	gulp.run('styles', 'html', 'scripts', 'resources');
});

gulp.task('resources', function() {
  gulp.run('images', 'fonts');
});

gulp.task('minify', function() {  
    gulp.src(['src/css/**/*.css', '!src/css/**/*.min.css'])
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(styl({compress : true}))
        .pipe(minify({
          ext:{
              src:'-debug.js',
              min:'.js'
          },
          exclude: ['tasks']
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./src/css'))
});

gulp.task('scripts', function() {  
    gulp.src(['src/**/**/*.js'])
        .pipe(gulp.dest('./dist'))
});

gulp.task('html', function() {  
	gulp.src('src/index.html')
	    .pipe(htmlreplace({
	        'css': 'css/bundle.min.css',
	         'js': 'js/main.js'
	    }))
	    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {  
    gulp.src(['src/css/**/*.min.css'])
        .pipe(concat('bundle.min.css'))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('images', function() {  
    gulp.src(['src/images/sprite.png'])
        .pipe(gulp.dest('./dist/images'))
});

gulp.task('fonts', function() {
    gulp.src(['src/fonts/**/*.*'])
        .pipe(gulp.dest('./dist/fonts'));
});

// WARNING! MANUAL ONLY!!!!!!
gulp.task('sprite', function () {
  var spriteData = gulp.src('src/images/**/*.png').pipe(spritesmith({
    imgName: './../images/sprite.png',
    cssName: './sprite.css',
  }));
  return spriteData.pipe(gulpif('*.png', gulp.dest('./src/images'), gulp.dest('./src/css')))
});