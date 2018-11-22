module.exports = function(grunt) {
    grunt.initConfig({
        // define source files and their destinations
        uglify: {
            files: {
                src: 'docs/js/*.js', // source files mask
                dest: 'docs/js/min/', // destination folder
                expand: true, // allow dynamic building
                flatten: true, // remove all unnecessary nesting
                ext: '.min.js' // replace .js to .min.js
            }
        },

        sass: {
            // Task
            dist: {
                // Target
                options: {
                    // Target options
                    style: 'compressed'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'docs/styles/',
                        src: ['*.scss'],
                        dest: 'docs/css',
                        ext: '.css'
                    }
                ]
            }
        },

        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['docs/js/*.js', 'docs/projects/**/*.js'],
                tasks: ['uglify']
            },
            sass: {
                files: [
                    'docs/styles/**/*.scss',
                    'docs/projects/**/dev/styles/*.scss'
                ],
                tasks: ['sass:dist']
            },
            html: {
                files: ['docs/projects/**/dev/*.html'],
                tasks: ['htmlbuild']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'docs/css/*.css',
                        'docs/js/*.js',
                        'docs/*.html',
                        'docs/projects/**/*.html',
                        'docs/projects/**/css/*.css',
                        'docs/projects/**/js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './docs'
                    }
                }
            }
        },

        htmlbuild: {
            dist: {
                src: 'layout/index.html',
                dest: 'docs/projects/test-project/index.html',
                options: {
                    beautify: true,
                    livereload: true,
                    relative: true,
                    basePath: false,
                    sections: {
                        layout: {
                            head: 'layout/head.html',
                            navigation: 'layout/navigation.html',
                            footer: 'layout/footer.html',
                            projectTitle: 'layout/projectTitle.html',
                            project:
                                'docs/projects/test-project/dev/project.html'
                        }
                    }
                },
                data: {
                    title: 'test titleeeeeeee'
                }
            }
        }
    });

    // load plugins
    const plugins = [
        'grunt-contrib-watch',
        'grunt-contrib-uglify',
        'grunt-contrib-sass',
        'grunt-browser-sync',
        'grunt-html-build'
    ];
    plugins.forEach(grunt.loadNpmTasks);

    // register at least this one task
    // grunt.registerTask('default', ['uglify']);
    // grunt.registerTask('default', ['sass']);

    grunt.registerTask('dev', ['browserSync:dev', 'watch']);
};
