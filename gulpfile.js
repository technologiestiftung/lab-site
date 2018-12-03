const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');

// Style plugins
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Script plugins
const uglify = require('gulp-uglify');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// Utility plugins
const { readFileSync, lstatSync, readdirSync } = require('fs');
const { basename, resolve, join } = require('path');
const sourcemaps = require('gulp-sourcemaps');
const mergeStream = require('merge-stream');

// Project specific
const gulpData = require('gulp-data');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
    readdirSync(source)
        .map(name => join(source, name))
        .filter(isDirectory);

// Get languages from the data directory
function getLanguagesFromData(dataPath) {
    const languagePaths = getDirectories(dataPath);
    const languages = languagePaths.map(languagePath => basename(languagePath));

    return languages;
}

const absoluteDataPath = resolve(__dirname, './src/data/');
const languages = getLanguagesFromData(absoluteDataPath);

const dirs = {
    dev: {
        entry: 'src',
        output: 'dist'
    },
    prod: {
        entry: 'src',
        output: 'build'
    }
};

/**
 * BrowserSync
 */
gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: dirs.dev.output
        },
        injectChanges: true,
        notify: true,
        open: false,
        port: process.env.PORT || 3000,
        ui: {
            port: 3001
        },
        startPath: '/de'
    });
});

/**
 * Sass Tasks
 */
const sassConfig = {
    options: {
        errLogToConsole: true,
        outputStyle: 'compressed'
    },
    entry: `${dirs.dev.entry}/styles/index.scss`,
    output: `${dirs.dev.output}/styles`
};
gulp.task('sass', function() {
    const { options, entry, output } = sassConfig;
    return gulp
        .src(entry)
        .pipe(sourcemaps.init())
        .pipe(sass(options).on('error', sass.logError))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(output))
        .pipe(browserSync.reload({ stream: true }));
});

/**
 * JS Tasks
 */
const jsSrc = './src/js/';
const jsMain = 'index.js';
var jsFiles = [jsMain];
var jsURL = './dist/js/';

gulp.task('js', function() {
    jsFiles.map(function(entry) {
        return browserify({
            entries: [`${jsSrc}${entry}`]
        })
            .transform(babelify, { presets: ['@babel/env'] })
            .bundle()
            .pipe(source(entry))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(jsURL))
            .pipe(browserSync.reload({ stream: true }));
    });
});

/**
 * Watch Tasks
 */
const watchTasksConfig = {
    sass: `${dirs.dev.entry}/styles/**/*`,
    scripts: `${dirs.dev.entry}/js/**/*`,
    nunjucks: `${dirs.dev.entry}/templates/**/*.html`,
    data: `${dirs.dev.entry}/data/**/*.json`
};
gulp.task('watch', ['browser-sync'], function() {
    const { sass, scripts, nunjucks, data } = watchTasksConfig;
    gulp.watch(sass, ['sass']);
    gulp.watch(scripts, ['js']);
    gulp.watch([nunjucks, data], ['nunjucks', browserSync.reload]);
});

// TODO: How to handle project generation form JSON?
// Get data from JSON files
function getDataForFile(file, language) {
    console.log(`→ Loaded JSON data for: ./${language}/${file.relative}`);

    const dataPath = `./src/data/${language}/website.json`;
    const dataJSON = readFileSync(dataPath, 'utf8');
    return JSON.parse(dataJSON);
}

/**
 * Nunjucks Tasks
 * https://github.com/carlosl/gulp-nunjucks-render
 */
gulp.task('nunjucks', function() {
    const websiteStreams = languages.map(language =>
        gulp
            .src(`${dirs.dev.entry}/templates/pages/**/*.html`)
            .pipe(gulpData(file => getDataForFile(file, language)))
            .pipe(
                nunjucksRender({
                    path: `${dirs.dev.entry}/templates`
                })
            )
            .pipe(gulp.dest(`dist/${language}`))
    );

    return mergeStream(websiteStreams);
});

gulp.task('default', ['nunjucks', 'js', 'watch']);
