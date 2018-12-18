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
const gulpRename = require('gulp-rename');
const jsonCombine = require('gulp-jsoncombine');
const highlight = require('gulp-prism');
const getProjectPrompts = require('./getProjectPrompts.js');

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
 * Create new Project
 *
 * Uses the project `test` as template for new projects and
 * prompted infos from the console
 */
gulp.task('create-project', async function() {
    // const projectInfo = await getProjectPrompts();
    // console.log(projectInfo);

    // const { name } = projectInfo;
    const name = 'lol';
    const formattedName = name
        .toLowerCase()
        .split(' ')
        .join('-');

    const fileContent = fs.readFileSync(
        './projects/example-project/project.json',
        'utf8'
    );

    return gulp
        .src(['./projects/example-project/**/*'])
        .pipe(() => {
            console.log(fileContent);
        })
        .pipe(gulp.dest(`./projects/${formattedName}/`));
});

/**
 * BrowserSync
 */
gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: outputPath,
            serveStaticOptions: {
                extensions: ['html']
            }
        },
        injectChanges: true,
        notify: false,
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
    projectEntries: `./projects/**/styles/index.scss`,
    output: `${outputPath}/styles`
};
gulp.task('sass', function() {
    const { options, entry, projectEntries, output } = sassConfig;
    const styleDirs = [
        { src: entry, dest: output },
        { src: projectEntries, dest: output }
    ];
    const sassTasks = styleDirs.map(function(styleDir) {
        const { src, dest } = styleDir;
        return gulp
            .src(src)
            .pipe(sourcemaps.init())
            .pipe(sass(options).on('error', sass.logError))
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(autoprefixer())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(dest))
            .pipe(browserSync.reload({ stream: true }));
    });

    return mergeStream(sassTasks);
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
 * Copy website assets directory
 */
gulp.task('copy-website-assets', function() {
    return gulp.src(['./src/assets/**/*']).pipe(gulp.dest('./dist/assets'));
});

/**
 * Watch Tasks
 */
const watchConfig = {
    sassPath: `${entryPath}/styles/**/*`,
    sassProjectsPath: `./projects/**/styles/**/*`,
    scriptsPath: `${entryPath}/js/**/*`,
    nunjucksPath: `${entryPath}/templates/**/*.html`,
    projectsPath: `./projects/**/*.html`,
    assetsPath: `${entryPath}/assets/**/*`,
    dataPath: `${entryPath}/data/**/*.json`
};
gulp.task('watch', ['browser-sync'], function() {
    const {
        sassPath,
        sassProjectsPath,
        scriptsPath,
        nunjucksPath,
        projectsPath,
        dataPath,
        assetsPath
    } = watchConfig;

    gulp.watch(sassPath, ['sass']);
    gulp.watch(sassProjectsPath, ['sass']);
    gulp.watch(scriptsPath, ['js']);
    gulp.watch(assetsPath, [
        'copy-website-assets',
        'nunjucks',
        browserSync.reload
    ]);
    gulp.watch(
        [nunjucksPath, projectsPath, dataPath],
        ['nunjucks', browserSync.reload]
    );
});

/**
 * Merge JSONs
 */
gulp.task('combine-json', function() {
    return gulp
        .src('./projects/**/project.json')
        .pipe(
            jsonCombine('combined.json', data => {
                const dataArray = Object.keys(data).map(key => data[key]);
                return new Buffer(JSON.stringify(dataArray));
            })
        )
        .pipe(gulp.dest(outputPath));
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
    projectsSrc: `./projects/**/*.html`,
    renderPath: `${entryPath}/templates`,
    envOptions: {
        throwOnUndefined: false, // TODO: Set to true after dev
        lstripBlocks: true,
        trimBlocks: true
    }
};

gulp.task('create-team', () => {
    const { templatesSrc, renderPath, envOptions } = nunjucksConfig;

    const teamFriends = languages.map(language => {
        const dataPath = `./src/data/${language}/website.json`;
        const dataJSON = readFileSync(dataPath, 'utf8');
        const data = JSON.parse(dataJSON);

        const team = data.team.map(d => {
            const { name } = d;
            const formattedName = name
                .toLowerCase()
                .split(' ')
                .join('-');

            return gulp
                .src([templatesSrc, `${renderPath}/layout/team-detail.html`])
                .pipe(gulpRename(`${formattedName}.html`))
                .pipe(
                    gulpData(file => {
                        return {
                            ...d
                        };
                    })
                )
                .pipe(
                    nunjucksRender({
                        path: `${renderPath}`,
                        envOptions
                    })
                )
                .pipe(gulp.dest(`${outputPath}/${language}/team/`));
        });

        return team;
    });

    return mergeStream(teamFriends);
});

gulp.task('nunjucks', ['create-team'], function() {
    const {
        templatesSrc,
        projectsSrc,
        renderPath,
        envOptions
    } = nunjucksConfig;
    const websiteStreams = languages.map(language => {
        const templateStream = gulp
            .src(templatesSrc)
            .pipe(gulpData(file => getDataForFile(file, language)))
            .pipe(
                nunjucksRender({
                    path: renderPath,
                    envOptions
                })
            )
            .pipe(highlight())
            .pipe(gulp.dest(`dist/${language}`));

        const projectStream = gulp
            .src(projectsSrc)
            .pipe(gulpData(file => getDataForFile(file, language)))
            .pipe(
                nunjucksRender({
                    path: renderPath,
                    envOptions
                })
            )
            .pipe(highlight())
            .pipe(gulp.dest(`dist/${language}/projects/`));

        return mergeStream(templateStream, projectStream);
    });

    return mergeStream(websiteStreams);
});

gulp.task('default', ['nunjucks', 'copy-website-assets', 'js', 'watch']);
