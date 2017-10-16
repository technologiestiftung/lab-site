module.exports = function (grunt) {
    grunt.initConfig({

    // define source files and their destinations
    uglify: {
        files: { 
            src: 'js/*.js',  // source files mask
            dest: 'js/min/',    // destination folder
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
            cwd: 'css',
            src: ['*.scss'],
            dest: 'css',
            ext: '.css'
          }]
        }
    },

    watch: {
        js:  { files: 'js/*.js', tasks: [ 'uglify' ] },
        sass:  { files: 'css/*.scss', tasks: [ 'sass' ] }
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