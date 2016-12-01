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
        },
        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    nodeArgs: ['--debug'],
                    watch: ['index.js', 'config/**/*.js', 'app/**/*.js'],
                    ignore: ['node_modules/**']
                }
            }
        },
        // Configure the grunt-contrib-jshint task
        jshint: {
            all: {
                src: ['server.js', 'config/**/*.js', 'app/**/*.js', 'public/js/*.js', 'public/modules/**/*.js'],
                options: {
                    node: true,
                    predef: [
                        "define",
                        "require",
                        "exports",
                        "module",
                        "describe",
                        "before",
                        "beforeEach",
                        "after",
                        "afterEach",
                        "it",
                        "inject",
                        "expect"
                    ]
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    // Load the external tasks
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    // Create the 'default' Grunt task
    grunt.registerTask('default');
};