/*
 * @Author: gaoyuan
 * @Date: 2020-11-03 11:45:57
 * @LastEditors: gaoyuan
 * @LastEditTime: 2020-11-03 11:46:32
 */
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    //Read the package.json (optional)
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
      basePath: './',
      srcPath: './sass/',
      deployPath: './css/',
      jsPath: './js/',
      minJsPath:'./js/'
    },
    sass: {
      dist: {
        files: {
          '<%= meta.deployPath %>style.css': '<%= meta.srcPath %>style.scss'
        },
        options: {
          'no-source-map': true
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= meta.deployPath %>',
          src: ['*.css', '!*.min.css'],
          dest: './css',
          ext: '.min.css'
        }]
      },
    },
    watch: {
      scripts: {
        files: [
          '<%= meta.srcPath %>/**/*.scss',
          '<%= meta.jsPath %>/**/*.js',
          '!**/node_modules/**',
          '!<%= meta.jsPath %>/**/*.min.js',
        ],
        tasks: ['sass','cssmin', "uglify"]
      }
    },
    uglify: {
      my_target: {
        report: 'min',
        options: {
          sourceMap: false,
        },
        files: [{
          expand: true,
          cwd: './js',
          src:["*.js", '!*.min.js'],
          dest: '<%= meta.minJsPath %>',
          ext: '.min.js'
        }]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  //eg: grunt sass
  //eg: grunt watch
  grunt.registerTask('default', ['sass','cssmin','uglify','watch']);
};