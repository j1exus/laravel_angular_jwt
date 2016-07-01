var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var notify = require('gulp-notify');
var Elixir = require('laravel-elixir');
var Task = Elixir.Task;

Elixir.extend('angular', function (src, output, outputFilename) {

    new Task('angular in ' + src, function () {

        return gulp.src([src + "main.js", src + "**/*.js"])
            .pipe(sourcemaps.init())
            .pipe(concat(outputFilename))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(output))
            .pipe(notify({
                title: 'Laravel Elixir',
                subtitle: 'Angular Compiled!',
                icon: __dirname + '/../node_modules/laravel-elixir/icons/laravel.png',
                message: ' '
            }));
    }).watch(src + '/**/*.js');

});