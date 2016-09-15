'use strict';

var gulp = require('gulp'); 
var autoprefixer = require('gulp-autoprefixer');
var htmlreplace = require('gulp-html-replace');
var concatCss = require('gulp-concat-css');
var styl = require('gulp-styl');  
var htmlreplace = require('gulp-html-replace');
var spritesmith = require('gulp.spritesmith');
var gulpif = require('gulp-if');

gulp.task('default', function() {
	gulp.run('styles', 'html', 'scripts');
});

//create sprites
gulp.task('sprite', function () {
  var spriteData = gulp.src('src/images/**/*.png').pipe(spritesmith({
    imgName: './../images/sprite.png',
    cssName: './sprite.css',
  }));
  return spriteData.pipe(gulpif('*.png', gulp.dest('./src/images'), gulp.dest('./src/css')))
});

gulp.task('scripts', function() {  
    gulp.src(['src/**/**/*.js'])
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('html', function() {  
	gulp.src('index.html')
	    .pipe(htmlreplace({
	        'css': 'css/bundle.css',
	         'js': 'js/all.js'
	    }))
	    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {  
    gulp.src(['src/**/**/*.css'])
     	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(styl({compress : true}))
        .pipe(concatCss("css/bundle.min.css"))
        .pipe(gulp.dest('./dist'))
});
