var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpRename = require('gulp-rename'),
    gulpReplace = require('gulp-replace'),
    weex = require('gulp-weex'),
    webpack = require('webpack'),
    server = require('gulp-server-livereload'),
    pkg = require('./package.json'),
    webConfig = require('./webpack.config.web'),
    weexConfig = require('./webpack.config.weex');

gulp.task('dev:serve', function() {
    gulp.src('./')
    .pipe(server({
        livereload: true,
        //directoryListing: true,
        open: true
    }));
});

gulp.task('build:web', function() {
    webpack(webConfig, function (err, stats) {
        if (err) console.log(err);
        console.log(stats.toString({
            colors: true,
            chunks: false
        }))
    });
});

gulp.task('bundle:weex', function() {
    webpack(weexConfig, function (err, stats) {
        if (err) console.log(err);
        console.log(stats.toString({
            colors: true,
            chunks: false
        }))
    });
});

/**
 * 构建模块入口,通过transformer来构建
 */
gulp.task('build:weex', [], function() {
    return gulp.src(['./src/weex/*.we'])
        .pipe(gulpReplace(
            /\/\/mock start,donot modify[^]*\/\/mock end/g, ''
        ))
        .pipe(gulpRename(function (path) {
            path.basename = (pkg.name).replace('wpm-','');
        }))
        .pipe(weex({
            oldFormat: false,
            isEntry: false
        }))
        .pipe(gulpRename(function (path) {
            path.basename = 'weex-index';
        }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function() {
    gulp.watch(['./src/web/*.js','./src/web/*.scss','./src/weex/*.we'], ['bundle:weex', 'build:web', 'build:weex']);
});

gulp.task('build', ['bundle:weex', 'build:weex', 'build:web']);
gulp.task('default', ['build', 'watch', 'dev:serve']);
