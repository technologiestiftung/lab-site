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
const gulpData = require('gulp-data');

/**
 * Variables
 */
const entryPath = './src';
const outputPath = './dist';

/**
 * Get languages from the data directory
 */
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
    readdirSync(source)
        .map(name => join(source, name))
        .filter(isDirectory);

function getLanguagesFromData(dataPath) {
    const languagePaths = getDirectories(dataPath);
    const languages = languagePaths.map(languagePath => basename(languagePath));

    return languages;
}

const absoluteDataPath = resolve(__dirname, './src/data/');
const languages = getLanguagesFromData(absoluteDataPath);

/**
 * BrowserSync
 */
gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: outputPath
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
    entry: `${entryPath}/styles/index.scss`,
    output: `${outputPath}/styles`
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
const jsConfig = {
    jsFiles: ['index.js'],
    jsEntryPath: `${entryPath}/js/`,
    jsOutputPath: `${outputPath}/js/`
};
gulp.task('js', function() {
    const { jsFiles, jsEntryPath, jsOutputPath } = jsConfig;
    jsFiles.map(function(entry) {
        return browserify({
            entries: [jsEntryPath]
        })
            .transform(babelify, { presets: ['@babel/env'] })
            .bundle()
            .pipe(source(entry))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(jsOutputPath))
            .pipe(browserSync.reload({ stream: true }));
    });
});

/**
 * Copy assets to /dist
 */
gulp.task('copy-assets', function() {
    return gulp.src(['./src/assets/**/*']).pipe(gulp.dest('./dist/assets'));
});

/**
 * Watch Tasks
 */
const watchConfig = {
    sassPath: `${entryPath}/styles/**/*`,
    scriptsPath: `${entryPath}/js/**/*`,
    nunjucksPath: `${entryPath}/templates/**/*.html`,
    assetsPath: `${entryPath}/assets/**/*`,
    dataPath: `${entryPath}/data/**/*.json`
};
gulp.task('watch', ['browser-sync'], function() {
    const {
        sassPath,
        scriptsPath,
        nunjucksPath,
        dataPath,
        assetsPath
    } = watchConfig;

    gulp.watch(sassPath, ['sass']);
    gulp.watch(scriptsPath, ['js']);
    gulp.watch(assetsPath, ['copy-assets', 'nunjucks', browserSync.reload]);
    gulp.watch([nunjucksPath, dataPath], ['nunjucks', browserSync.reload]);
});

// Data will be available in templates
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
const nunjucksConfig = {
    templatesSrc: `${entryPath}/templates/pages/**/*.html`,
    renderPath: `${entryPath}/templates`,
    envOptions: {
        throwOnUndefined: true,
        lstripBlocks: true,
        trimBlocks: true
    }
};
gulp.task('nunjucks', function() {
    const { templatesSrc, renderPath, envOptions } = nunjucksConfig;
    const websiteStreams = languages.map(language =>
        gulp
            .src(templatesSrc)
            .pipe(gulpData(file => getDataForFile(file, language)))
            .pipe(
                nunjucksRender({
                    path: renderPath,
                    envOptions
                })
            )
            .pipe(gulp.dest(`dist/${language}`))
    );

    return mergeStream(websiteStreams);
});

gulp.task('default', ['nunjucks', 'copy-assets', 'js', 'watch']);
