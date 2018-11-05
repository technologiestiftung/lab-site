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
                        cwd: 'docs/css',
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
            sass: { files: ['docs/css/*.scss'], tasks: ['sass'] }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: ['docs/css/*.css', 'docs/js/*.js', 'docs/*.html']
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './docs'
                    }
                }
            }
        }
    });

    // load plugins
    const plugins = [
        'grunt-contrib-watch',
        'grunt-contrib-uglify',
        'grunt-contrib-sass',
        'grunt-browser-sync'
    ];
    plugins.forEach(grunt.loadNpmTasks);

    // register at least this one task
    // grunt.registerTask('default', ['uglify']);
    // grunt.registerTask('default', ['sass']);

    grunt.registerTask('dev', ['browserSync:dev', 'watch']);
};
