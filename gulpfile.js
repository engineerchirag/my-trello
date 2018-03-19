var gulp = require('gulp'),
    strip = require('gulp-strip-comments'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass');

var gulpPaths = {
    "bc": "./app/bower_components/",
    "js": "./app/js/",
    "sass": "./src/scss/",
    "dist": "./dist/",
    "views": "./src/views/",
    "app": "./app/"
};

function app() {
    return gulp.src([
        gulpPaths.app + 'app.js',
        gulpPaths.app + 'common/**/*.js',
        gulpPaths.app + 'components/**/*.js',
        gulpPaths.app + 'view2/**/*.js'
    ])
    .pipe(strip())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(gulpPaths.dist + 'js'));
}

function vendor() {
    return gulp.src([
        gulpPaths.bc + 'html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',
        gulpPaths.bc + 'angular/angular.js',
        gulpPaths.bc + 'angular-route/angular-route.js',
        gulpPaths.app + 'assets/js/ngDraggable.js',
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(gulpPaths.dist + 'js'));
}

function makeSass() {
    return gulp.src([
        gulpPaths.app + 'components/**/*.scss',
        gulpPaths.app + 'app.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(gulpPaths.dist+'css'));
}

function style() {
    return gulp.src([
        gulpPaths.bc + 'html5-boilerplate/dist/css/normalize.css',
        gulpPaths.bc + 'html5-boilerplate/dist/css/main.css'
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(gulpPaths.dist+'css'))
}

function assets() {
    return gulp.src([
        gulpPaths.app + '**/*.json'
    ])
    .pipe(gulp.dest(gulpPaths.dist));
}

function views() {
    return gulp.src([
        gulpPaths.app + '**/*.html'
    ])
    .pipe(strip())
    .pipe(gulp.dest(gulpPaths.dist));
}
gulp.task('app', app);
gulp.task('vendor', vendor);
gulp.task('sass', makeSass);
gulp.task('style', style);
gulp.task('views', views);
gulp.task('assets', assets);

gulp.task('default', [ 'style', 'sass', 'views', 'vendor', 'app', 'watch', 'serve', 'assets']);

gulp.task('watch', function () {
    gulp.watch(gulpPaths.app + '**/*.scss', ['sass']);
    gulp.watch(gulpPaths.app + '**/*.js', ['app']);
    gulp.watch(gulpPaths.app + '**/*.html', ['views'])
})

gulp.task('serve', function () {
    var http = require('http');
    var statics = require('node-static');
    var fs = require('fs');

    var st = new statics.Server('./dist/', {cache: -1});

    console.log('Development server started a http://localhost:3020');

    http.createServer(function (req, res) {
        st.serve(req, res);
    }).listen(3020);
});