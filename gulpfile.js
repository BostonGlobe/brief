var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-clean'),
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	fileinclude = require('gulp-file-include');

gulp.task('prod', ['js', 'css'], function() {
	gulp.start('html');
});

gulp.task('js', function() {
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('src/temp'));
});

gulp.task('css', function() {
	return gulp.src('src/css/main.css')
		.pipe(minifycss())
		.pipe(gulp.dest('src/temp'));
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*')
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('img'));
});

gulp.task('html', function() {
	return gulp.src('src/index.html')
		.pipe(fileinclude('@@'))
		.pipe(gulp.dest(''));
});

gulp.task('clean', function() {
	return gulp.src(['index.html','src/temp'], {read: false})
		.pipe(clean());
});

gulp.task('default', ['clean'], function() {
	gulp.start('prod');
});