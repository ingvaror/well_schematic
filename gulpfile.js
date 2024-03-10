/**
 * This is an example gulpfile.js for orchestrating a Webpack build alongside the Hugo static site generator.
 * 
 * This example assumes you already have Webpack installed and configured in your project.
 * 
 * To get started, install Gulp and BrowserSync with the following command:
 * npm install gulp browser-sync
 * 
 * Then add this file to your project and name it gulpfile.js
 */

const gulp = require("gulp");
const replace = require('gulp-replace');
const rename = require("gulp-rename");
const replacestring = require('gulp-string-replace');
const inlinesource = require('gulp-inline-source');
const webpack = require("webpack");
const webpackConfig = require('./webpack.config.js') // this should be the relative path to your Webpack config

/**
 * Run webpack to build assets as specified in webpack config
 */
function assets(cb) {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                return reject(err)
            }
            if (stats.hasErrors()) {
                return reject(new Error(stats.compilation.errors.join('\n')))
            }
            resolve()
        })
    })
}

function production() {
    return gulp.src('./dist/index.html')
        //.pipe(replacestring(']]>', ']] >'))
        .pipe(replacestring('ResolverFactory\\.initResolver\\(a\\.ResolverFactory\\.WEBSOCKET_RESOLVER\\)', 'ResolverFactory.initResolver(a.ResolverFactory.JAVA_RESOLVER)'))
        .pipe(rename('well_schematic_html.html'))
        .pipe(gulp.dest('../../server/well_schematic/data'))
}

/**
 * returns a gulp task to run the ssg build depending on environment specified.
 * 
 */
function ssg(cb) {
    return gulp.src('./dist/*.html')
        .pipe(replace('.js"></script>', '.js" inline></script>'))
        .pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
        .pipe(inlinesource({
            compress: false,
            ignore: ['png']
        }))
        .pipe(gulp.dest('./dist'));
}



exports.build = gulp.series(assets, ssg, production)
