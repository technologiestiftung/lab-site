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
const highlight = require('gulp-prism');
const map = require('map-stream');
const dateFilter = require('nunjucks-date-filter');

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

const getDirectoryNames = source =>
    readdirSync(source)
        .filter(item => !/(^|\/)\.[^\/\.]/g.test(item))
        .map(name => name);

function getLanguagesFromData(dataPath) {
    const languagePaths = getDirectories(dataPath);
    const languages = languagePaths.map(languagePath => basename(languagePath));

    return languages;
}

// TODO: Get data for languages in order to remove logic from templates
function getProjectsData(language) {
    const projectDirPaths = getDirectories('./projects');
    return projectDirPaths.map(projectDirPath => {
        const projectDataJSON = readFileSync(
            `${projectDirPath}/project.json`,
            'utf8'
        );
        return JSON.parse(projectDataJSON);
    });
}

const absoluteDataPath = resolve(__dirname, './src/data/');
const languages = getLanguagesFromData(absoluteDataPath);

/**
 * Create new Project
 *
 * Uses the project `test` as template for new projects and
 * prompted infos from the console
 */
function isJSONString(string) {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}

gulp.task('create-project', async function() {
    const projectInfo = await getProjectPrompts();
    const { title, confirmation } = projectInfo;

    if (!title || !confirmation) {
        console.log('Project creation was aborted!');
        process.exit(0);
    }

    const formattedTitle = title
        .toLowerCase()
        .split(' ')
        .join('-');

    return gulp
        .src(['./projects/example-project/**/*'])
        .pipe(
            map(function(file, done) {
                const fileContent = file.contents || '';
                const fileString = fileContent.toString();
                const isJSON = isJSONString(fileString);

                if (isJSON) {
                    const parsedJSON = JSON.parse(fileString);
                    const modifiedJSON = {
                        en: {
                            ...parsedJSON.en,
                            ...projectInfo,
                            date: new Date()
                        },
                        de: {
                            ...parsedJSON.de,
                            title: projectInfo.title,
                            authors: projectInfo.authors,
                            type: projectInfo.type,
                            currentStatus: projectInfo.currentStatus,
                            isFeatured: projectInfo.isFeatured,
                            date: new Date()
                        }
                    };

                    // TODO: Remove debug log
                    // console.log('Created project data:');
                    // console.log(modifiedJSON);

                    file.contents = new Buffer(JSON.stringify(modifiedJSON));
                }

                done(null, file);
            })
        )
        .pipe(gulp.dest(`./projects/${formattedTitle}/`));
});

/**
 * BrowserSync
 */
const content404 = readFileSync(join(__dirname, '404.html'));
gulp.task('browser-sync', ['sass'], function() {
    browserSync.init(
        {
            server: {
                baseDir: outputPath,
                serveStaticOptions: {
                    extensions: ['html']
                }
            },
            injectChanges: true,
            notify: false,
            open: true,
            port: process.env.PORT || 3000,
            ui: {
                port: 3001
            },
            startPath: '/en'
        },
        function(err, bs) {
            bs.addMiddleware('*', (req, res) => {
                // Provides 404 content without redirect
                res.write(content404);
                res.end();
            });
        }
    );
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
gulp.task('js', ['js-projects'], function() {
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
 * JS Projects Tasks
 */
gulp.task('js-projects', function() {
    const projectDirNames = getDirectoryNames('./projects');

    projectDirNames.map(projectDirName => {
        return browserify({
            entries: [`./projects/${projectDirName}/js`]
        })
            .transform(babelify, { presets: ['@babel/env'] })
            .bundle()
            .pipe(source('index.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(`dist/js/${projectDirName}/`))
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
    projectsScriptPaths: `./projects/**/js/*.js`,
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
        projectsScriptPaths,
        dataPath,
        assetsPath
    } = watchConfig;

    gulp.watch(sassPath, ['sass']);
    gulp.watch(sassProjectsPath, ['sass']);
    gulp.watch(scriptsPath, ['js']);
    gulp.watch(projectsScriptPaths, ['js-projects']);
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

// Data will be available in templates
function getWebsiteDataForFile(file, language) {
    console.log(`→ Loaded JSON data for: ./${language}/${file.relative}`);

    const websiteDataPath = `./src/data/${language}/website.json`;
    const websiteDataJSON = readFileSync(websiteDataPath, 'utf8');
    const parsedWebsiteDataJSON = JSON.parse(websiteDataJSON);
    const projectsData = getProjectsData(language);

    return { ...parsedWebsiteDataJSON, projects: projectsData };
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

// Manage nunjucks environment with hook
const manageEnvironment = function(environment) {
    // Slug filter
    environment.addFilter('slug', function(str) {
        return str && str.replace(/\s/g, '-', str).toLowerCase();
    });

    // Date filter
    environment.addFilter('date', dateFilter);
    dateFilter.setDefaultFormat('DD MMM YYYY');

    // Sort projects by date
    environment.addFilter('sortProjectsByDate', function(data) {
        if (data) {
            // TODO: Too specific
            const sortedProjectDataByDate = data.sort(
                (a, b) => a.en.date < b.en.date
            );
            return sortedProjectDataByDate;
        }
    });

    // Define global variables
    environment.addGlobal('currentDate', new Date());
};

gulp.task('create-team', () => {
    const { templatesSrc, renderPath, envOptions } = nunjucksConfig;

    const teamFriends = languages.map(language => {
        const dataPath = `./src/data/${language}/website.json`;
        const dataJSON = readFileSync(dataPath, 'utf8');
        const data = JSON.parse(dataJSON);

        const team = data.team.current.map(d => {
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
                            ...d,
                            language,
                            pages: data.pages
                        };
                    })
                )
                .pipe(
                    nunjucksRender({
                        path: `${renderPath}`,
                        envOptions,
                        manageEnv: manageEnvironment
                    })
                )
                .pipe(gulp.dest(`${outputPath}/${language}/team/`));
        });

        return team;
    });

    return mergeStream(teamFriends);
});

gulp.task('create-datasets', () => {
    const { templatesSrc, renderPath, envOptions } = nunjucksConfig;

    const datasets = languages.map(language => {
        const dataPath = `./src/data/${language}/website.json`;
        const dataJSON = readFileSync(dataPath, 'utf8');
        const data = JSON.parse(dataJSON);

        const dataset = data.data.map(d => {
            const { name } = d;
            const formattedName = name
                .toLowerCase()
                .split(' ')
                .join('-');

            return gulp
                .src([templatesSrc, `${renderPath}/layout/dataset.html`])
                .pipe(gulpRename(`${formattedName}.html`))
                .pipe(
                    gulpData(file => {
                        return {
                            ...d,
                            language,
                            pages: data.pages
                        };
                    })
                )
                .pipe(
                    nunjucksRender({
                        path: `${renderPath}`,
                        envOptions,
                        manageEnv: manageEnvironment
                    })
                )
                .pipe(gulp.dest(`${outputPath}/${language}/datasets/`));
        });

        return dataset;
    });

    return mergeStream(datasets);
});

gulp.task('nunjucks', ['create-team', 'create-datasets'], function() {
    const {
        templatesSrc,
        projectsSrc,
        renderPath,
        envOptions
    } = nunjucksConfig;
    const websiteStreams = languages.map(language => {
        const templateStream = gulp
            .src(templatesSrc)
            .pipe(gulpData(file => getWebsiteDataForFile(file, language)))
            .pipe(
                nunjucksRender({
                    path: renderPath,
                    envOptions,
                    manageEnv: manageEnvironment
                })
            )
            .pipe(highlight())
            .pipe(gulp.dest(`dist/${language}`));

        // projectIndexHelper is used in `src/templates/layout/project` in order to
        // get the correct project data for the template
        let projectIndexHelper = -1;
        // TODO: Remove deleted projects from dist (+ watch-task)
        const projectStream = gulp
            .src(projectsSrc)
            .pipe(
                gulpData(file => {
                    projectIndexHelper += 1;
                    const websiteData = getWebsiteDataForFile(file, language);
                    return { ...websiteData, projectIndexHelper };
                })
            )
            .pipe(
                nunjucksRender({
                    path: renderPath,
                    envOptions,
                    manageEnv: manageEnvironment
                })
            )
            .pipe(highlight())
            .pipe(gulp.dest(`dist/${language}/projects/`));

        return mergeStream(templateStream, projectStream);
    });

    return mergeStream(websiteStreams);
});

gulp.task('default', ['nunjucks', 'copy-website-assets', 'js', 'watch']);

gulp.task('build', ['nunjucks', 'copy-website-assets', 'js']);
