module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            dist: {
                options: {
                    targetDir: './vendor',
                    layout: 'byType',
                    cleanTargetDir: true
                }
            }
        },
        jshint: {
            client: {
                options: {
                    browser: true,
                    globals: {
                        jQuery: true,
                        console: true
                    }
                },
                src: ['assets/js/*.js']
            }
        },
        concat: {
            options: {
                separator: ';\n'
            },
            js: {
                src: ['vendor/js/**/*.js', 'assets/js/*.js'],
                dest: 'dist/js-concat/<%= pkg.name %>.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js-min/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= concat.js.dest %>'],
                        dest: 'dist/public/js/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['assets/html/index.html'],
                        dest: 'dist/public/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['assets/shaders/*.glsl'],
                        dest: 'dist/public/shaders/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['dist/js-min/*.js'],
                        dest: 'dist/public/js/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        watch: {
            js: {
                files: ['assets/js/*.js'],
                tasks: ['jshint', 'concat', 'uglify', 'copy']
            },
            shaders: {
                files: ['assets/shaders/*.glsl'],
                tasks: ['copy']
            },
            html: {
                files: ['assets/html/*.html'],
                tasks: ['copy']
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-include-replace');

    grunt.registerTask('default', ['jshint', 'bower', 'concat', 'uglify', 'copy']);
};