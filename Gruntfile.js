'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    var fileList = ['lib/**.js', 'test/*.js'];

    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/**/*.js']
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: true
            },
            all: fileList
        }
    });

    grunt.registerTask('test', ['jshint', 'mochaTest']);

};
