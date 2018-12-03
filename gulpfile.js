const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const browserSync = require('browser-sync').create();

const languages = ['de', 'en'];

const isProd = process.env.NODE_ENV === 'production';
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

function getDataForFile(file) {
    return {
        example: 'data loaded for ' + file.relative
    };
}

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
    sassPath: `${dirs.dev.entry}/styles/**/*`,
    nunjucksPath: `${dirs.dev.entry}/templates/**/*.html`
};
gulp.task('watch', ['browser-sync'], function() {
    const { sassPath, nunjucksPath } = watchTasksConfig;
    gulp.watch(sassPath, ['sass']);
    gulp.watch(nunjucksPath, ['nunjucks', browserSync.reload]);
});

/**
 * Nunjucks Tasks
 */
gulp.task('nunjucks', function() {
    return gulp
        .src(`${dirs.dev.entry}/templates/pages/**/*.html`)
        .pipe(data(getDataForFile))
        .pipe(
            nunjucksRender({
                path: `${dirs.dev.entry}/templates`
            })
        )
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['nunjucks', 'watch']);
