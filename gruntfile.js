/*global module*/
module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: "",
                stripBanner: false
            },
            dist: {
                src: ['public/js/modules/modul.js',
                    'public/js/services/book.js',
                    'public/js/services/bookcount.js',
                    'public/js/services/booksearchcount.js',
                    'public/js/controllers/mainCtrl.js',
                    'public/js/controllers/detailCtrl.js',
                    'public/js/controllers/scrollCtrl.js'
                    ],
                dest: 'public/js/app.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'public/css/style.css': 'public/css/style.scss'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ["concat"]);
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['sass']);

};
