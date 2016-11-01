// Invoke 'strict' JavaScript mode
'use strict';

module.exports = function(grunt) {
    // Initialize the Grunt configuration
    grunt.initConfig({
        // Configure the grunt-env task
        env: {
            test: {
                NODE_ENV: 'test'
            },
            dev: {
                NODE_ENV: 'development'
            }
        },
        // Configure the grunt-contrib-watch task
        watch: {
            options: {
                    livereload: true
            },
            js: {
                files: ['server.js', 'config/**/*.js', 'app/**/*.js', 'public/js/*.js', 'public/modules/**/*.js']
            }
        }
    });

    // Load the external tasks
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Create the 'default' Grunt task
    grunt.registerTask('default');
};