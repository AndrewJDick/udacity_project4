var gulp 	= require('gulp');
var uglify 	= require('gulp-uglify');
var cssmin  = require('gulp-cssnano');
var plumber = require('gulp-plumber');
var imgmin  = require('gulp-imagemin');


// Minify Task
// Minifies src css/js files, then outputs to the respective folder in the dist directory
// Plumber added to the task to prevent the watch task from crashing anytime a syntax error is present.
gulp.task('minify', function (){
	gulp.src(['src/js/*.js', 'src/views/js/*.js'])
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));

	gulp.src(['src/css/*.css', 'src/views/css/*.css'])
	    .pipe(plumber())
	    .pipe(cssmin())
	    .pipe(gulp.dest('dist/css'));
});


// Watch Task
// Updates minified dist css/js files anytime src css/js files are saved.
gulp.task('watch', function(){
	gulp.watch(['src/js/*.js', 'src/views/js/*.js'], ['minify']);
	gulp.watch(['src/css/*.css', 'src/views/css/*.css'], ['minify']);
});


// Image Compress Task
// Compress all images, removing metadata
gulp.task('image', function(){
	gulp.src(['src/img/*', 'src/views/img/*'])
		.pipe(imgmin())
		.pipe(gulp.dest('dist/img'));
});

// Default Task
// Tasks that will execute when the user runs 'Gulp' in the terminal
gulp.task('default', ['minify' , 'watch']);