fs = require 'fs'

module.exports = (grunt) ->

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.initConfig
    watch:
      testTemplates:
        files: ['test/**/*.hbs']
        tasks: ['handlebars']
      build:
        files: ['lib/**/*.{js,hbs}', 'main.js']
        tasks: ['build']

    handlebars:
      build:
        options:
          namespace: 'K5'
          amd: true
        files:
          "lib/templates.js": "lib/templates/*.hbs"

    requirejs:
      build:
        options:
          mainConfigFile: 'main.js',

    concat:
      build:
        src: [
          'lib/**/*.js'
          'lib/templates.js'
        ]
        dest: 'dist/main.js'

    clean:
      build: ['build']

  grunt.registerTask 'build', ['clean:build', 'handlebars', 'requirejs']
  grunt.registerTask 'default', ['build', 'watch']
