"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var bourbon = require("node-bourbon").includePaths;
var neat = require("node-neat").includePaths;




// Gulp watch syntax


gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('src/scss/**/*.scss', ['sass']);
	// other watchers
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
})



// Tasks


gulp.task('sass', function(){
	return gulp.src('src/scss/**/*.scss')
	.pipe(sass({
		includePaths: bourbon,
		includePaths: neat
	}))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});


// spin up a server
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'src'
		},
	})
})

gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    //minifies only if its a javascript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// gulp.task('fonts', function() {
// 	return gulp.src('app/fonts/**/*')
// 	.pipe(gulp.dest('dist/fonts'))
// })

gulp.task('clean:dist', function() {
	return del.sync('dist');
})

gulp.task('build', function(callback){
	runSequence('clean:dist',
	 ['sass','useref'], callback);

});

gulp.task('default', function(callback){
	runSequence(['sass','browserSync', 'watch'],
		callback
		)
});
