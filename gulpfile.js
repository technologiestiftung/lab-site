const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const nunjucksRender = require('gulp-nunjucks-render');
const gulpData = require('gulp-data');
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

function getDataForFile(file, language) {
    console.info(`→ Loaded JSON data for ${file.relative}`);

    const dataDe = {
        cssPath: './styles/index.css',
        navigationItems: [
            { name: 'Item 1', type: 'green' },
            { name: 'Item 2', type: 'blue' },
            { name: 'Item 3', type: 'blue' }
        ]
    };

    const dataEn = {
        cssPath: './styles/index.css',
        navigationItems: [
            { name: 'Item 1 English', type: 'green' },
            { name: 'Item 2 English', type: 'blue' },
            { name: 'Item 3 English', type: 'blue' }
        ]
    };

    const dataLang = language === 'en' ? dataEn : dataDe;

    return dataLang;
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
 * https://github.com/carlosl/gulp-nunjucks-render
 */
gulp.task('nunjucks', function() {
    return gulp
        .src(`${dirs.dev.entry}/templates/pages/**/*.html`)
        .pipe(gulpData(file => getDataForFile(file, 'de')))
        .pipe(
            nunjucksRender({
                path: `${dirs.dev.entry}/templates`
            })
        )
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['nunjucks', 'watch']);
