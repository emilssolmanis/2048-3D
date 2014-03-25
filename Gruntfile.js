module.exports = function(grunt) {
    "use strict";
    require('time-grunt')(grunt);

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
                src: ['src/js/*.js']
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js-min/<%= pkg.name %>.min.js': ['dist/js-required/<%= pkg.name %>.js']
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['dist/js-required/<%= pkg.name %>.js'],
                        dest: 'dist/public/js/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/html/index.html'],
                        dest: 'dist/public/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/shaders/*.glsl'],
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
                files: ['src/js/*.js'],
                tasks: ['requirejs', 'uglify', 'copy']
            },
            shaders: {
                files: ['src/shaders/*.glsl'],
                tasks: ['copy']
            },
            html: {
                files: ['src/html/*.html'],
                tasks: ['copy']
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src/js',
                    almond: true,
                    name: 'main',
                    optimize: 'none',
                    out: 'dist/js-required/<%= pkg.name %>.js',
                    paths: {
                        jquery: '../../vendor/js/jquery/jquery',
                        three: '../../vendor/js/threejs/three'
                    },
                    shim: {
                        three: {
                            exports: 'THREE'
                        }
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-include-replace');

    grunt.registerTask('default', ['bower', 'requirejs', 'uglify', 'copy']);
    grunt.registerTask('dist', ['jshint', 'default']);
};
