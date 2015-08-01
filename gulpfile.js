var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    connect = require('gulp-connect');
    jasmine = require('gulp-jasmine');



gulp.task('lint', function () {
    // Note: To have the process exit with an error code (1) on
    //  lint error, return the stream and pipe to failOnError last.
    return gulp.src(['src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], function () {
    // This will only run if the lint task is successful...
});



gulp.task('serve', function () {
    connect.server({
        root: '.',
        port: 9000
    });
});
