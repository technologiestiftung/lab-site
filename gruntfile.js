module.exports = function (grunt) {
    grunt.initConfig({

    // define source files and their destinations
    uglify: {
        files: { 
            src: 'site/js/*.js',  // source files mask
            dest: 'site/js/min/',    // destination folder
            expand: true,    // allow dynamic building
            flatten: true,   // remove all unnecessary nesting
            ext: '.min.js'   // replace .js to .min.js
        }
    },

    sass: {                              // Task
        dist: {                            // Target
          options: {                       // Target options
            style: 'compressed'
          },
          files: [{
            expand: true,
            cwd: 'site/css',
            src: ['*.scss'],
            dest: 'site/css',
            ext: '.css'
          }]
        }
    },

    watch: {
        js:  { files: 'site/js/*.js', tasks: [ 'uglify' ] },
        sass:  { files: 'site/css/*.scss', tasks: [ 'sass' ] }
    }
});

// load plugins
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-sass');

// register at least this one task
grunt.registerTask('default', [ 'uglify' ]);
grunt.registerTask('default', [ 'sass' ]);


};