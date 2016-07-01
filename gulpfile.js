var elixir = require('laravel-elixir');
require('./tasks/angular.task.js');
require('./tasks/bower.task.js');

elixir(function (mix) {
    mix
        .bower(null, 'public/js', null, 'public/css')
        .angular('./angular/', 'public/js', 'app.js')
        .sass('./angular/**/*.scss', 'public/css')
        .copy('./angular/app/**/*.html', 'public/views/app/')
        .copy('./angular/directives/**/*.html', 'public/views/directives/')
});