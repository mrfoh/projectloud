var gulp = require('gulp'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	watch = require('gulp-watch'),
	watchLess = require('gulp-watch-less'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

var gutil = require('gulp-util');


/** LESS Tasks **/
gulp.task('less:admin', function() {
	return gulp.src('./less/admin/app.less')
				.pipe(less())
				.pipe(minifyCSS())
				.pipe(gulp.dest('./css/admin'))
})

gulp.task('fontawesome', function() {
	return gulp.src('./less/font-awesome/font-awesome.less')
				.pipe(less())
				.pipe(minifyCSS())
				.pipe(gulp.dest('./css'))
})

gulp.task('bootstrap', function() {
	return gulp.src('./less/bootstrap/bootstrap.less')
				.pipe(less())
				.pipe(minifyCSS())
				.pipe(gulp.dest('./css'))
})

gulp.task('build:admin-dev', function() {
	return gulp.src([
		'js/vendor/jquery/jquery.min.js',
		'js/vendor/angular/angular.js',
		'js/vendor/angular/**/*.js',
		'js/vendor/libs/*.js',
		'js/admin/*.js',
		'js/admin/directives/*.js',
	    'js/admin/services/*.js'
	])
	.pipe(concat('dist.js'))
	.pipe(uglify())
	.pipe(gulp.dest('js/admin/dist'))
})


gulp.task('watch', function() {
	  watch('less/admin/*.less', function() {
        gulp.start('less:admin')
        .on('error', gutil.log);
    })  
});