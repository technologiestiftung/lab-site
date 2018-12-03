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

gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: dirs.dev.output
        },
        injectChanges: true,
        notify: true,
        open: true,
        port: process.env.PORT || 3000,
        ui: {
            port: 3001
        }
    });
});

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

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(`${dirs.dev.entry}/styles/**/*`, ['sass']);
    gulp.watch(`${dirs.dev.entry}/templates/**/*`, [
        'nunjucks',
        browserSync.reload
    ]);
});

gulp.task('nunjucks', function() {
    return gulp
        .src(`${dirs.dev.entry}/templates/**/*.html`)
        .pipe(data(getDataForFile))
        .pipe(
            nunjucksRender({
                path: `${dirs.dev.output}/templates`
            })
        )
        .pipe(gulp.dest('dist'));
});

// https://github.com/carlosl/gulp-nunjucks-render
const nunjucksConfig = {};
gulp.task('default', ['watch', 'nunjucks']);
