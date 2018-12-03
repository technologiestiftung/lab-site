const gulp = require('gulp');
const fs = require('fs');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const nunjucksRender = require('gulp-nunjucks-render');
const gulpData = require('gulp-data');
const mergeStream = require('merge-stream');
const browserSync = require('browser-sync').create();

const languages = ['de', 'en'];
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
        }
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
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest(output))
        .pipe(browserSync.reload({ stream: true }));
});

/**
 * Watch Tasks
 */
const watchTasksConfig = {
    sass: `${dirs.dev.entry}/styles/**/*`,
    nunjucks: `${dirs.dev.entry}/templates/**/*.html`,
    data: `${dirs.dev.entry}/data/**/*.json`
};
gulp.task('watch', ['browser-sync'], function() {
    const { sass, nunjucks, data } = watchTasksConfig;
    gulp.watch(sass, ['sass']);
    gulp.watch(nunjucks, ['nunjucks', browserSync.reload]);
    gulp.watch(data, ['nunjucks', browserSync.reload]);
});

// TODO: How to handle project generation form JSON?
// Get data from JSON files
function getDataForFile(file, language) {
    console.info(`→ Loaded JSON data for ${file.relative}`);

    const dataPath =
        language === 'en'
            ? './src/data/en/website.json'
            : './src/data/de/website.json';
    const dataJSON = fs.readFileSync(dataPath, 'utf8');

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

gulp.task('default', ['nunjucks', 'watch']);
