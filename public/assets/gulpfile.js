var gulp = require('gulp'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	watch = require('gulp-watch'),
	watchLess = require('gulp-watch-less'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename');

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

gulp.task('build:admin', function() {
	return gulp.src([
		'js/vendor/jquery/jquery.min.js',
		'js/vendor/angular/angular.js',
		'js/vendor/angular/**/*.js',
		'js/vendor/libs/*.js',
		'js/admin/*.js',
		'js/admin/interceptors/*.js',
		'js/admin/directives/*.js',
	    'js/admin/services/*.js'
	])
	.pipe(concat('dist.js'))
	.pipe(uglify())
	.pipe(gulp.dest('js/admin/dist'))
})

gulp.task('build:frontend', function() {
	return gulp.src([
		'js/vendor/jquery/jquery.min.js',
		'js/vendor/libs/underscore.js',
		'js/vendor/angular/angular.js',
		'js/vendor/angular/angular-animate/angular-animate.js',
		'js/vendor/angular/angular-resource/angular-resource.js',
		'js/vendor/angular/angular-sanitize/angular-sanitize.js',
		'js/vendor/angular/angular-touch/angular-touch.js',
		'js/vendor/angular/angular-ui-router/angular-ui-router.js',
		'js/vendor/angular/ngstorage/ngStorage.js',
		'js/vendor/angular/file-upload/ng-file-upload-all.min.js',
		'js/vendor/angular/file-upload/ng-file-upload-shim.min.js',
		'js/vendor/angular/angular-bootstrap/ui-bootstrap-tpls.js',
		'js/vendor/angular/onboarding/ng-onboarding.min.js',
		'js/vendor/angular/oclazyload/ocLazyLoad.js',
		'js/vendor/angular/angular/angulartics/dist/angulartics.min.js',
		'js/vendor/angular/angular/angulartics/dist/angulartics-ga.min.js',
		'js/frontend/interceptor.js',
		'js/frontend/*.js',
		'js/admin/services/ui-load.js',
		'js/admin/directives/ui-jq.js',
		'js/frontend/services/*.js',
		'js/frontend/directives/*.js'
	])
	.pipe(concat('dist.js'))
	.pipe(gulp.dest('js/frontend/dist'))
	.pipe(rename('dist.min.js'))
	.pipe(uglify({mangle: false}))
	.pipe(gulp.dest('js/frontend/dist'))
});

gulp.task('less:frontend', function() {
	return gulp.src('./less/frontend/frontend.less')
				.pipe(less())
				.pipe(minifyCSS())
				.pipe(gulp.dest('./css/frontend'))
})

gulp.task('css:frontend', function() {
	return gulp.src([
			'./css/bootstrap.css',
			'./css/frontend/frontend.css'
		])
		.pipe(concat('dist.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./css/frontend'))
});

gulp.task('watch', function() {
	  watch('less/admin/*.less', function() {
        gulp.start('less:admin')
        .on('error', gutil.log);
    })

    watch('less/frontend/*.less', function() {
        gulp.start('less:frontend')
        .on('error', gutil.log);
    })
});