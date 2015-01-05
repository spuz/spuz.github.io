module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    compass: {                  // https://github.com/gruntjs/grunt-contrib-compass
      prod: {
        options: {
          sassDir: '_sass',
          cssDir: 'css',
          environment: 'production',
          outputStyle: 'compressed',
          noLineComments: true,
          watch: false
        }
      },
      dev: {
        options: {
          sassDir: '_sass',
          cssDir: '_site/css',
          environment: 'development',
          outputStyle: 'expanded',
          noLineComments: false,
          watch: true
        }
      }
    },

    jekyll: {
      prod: {
        src: '.',
        dest: './_site',
        safe: true
      }
    },

    watch: {  // https://github.com/gruntjs/grunt-contrib-watch
      jekyll: {
        files: [
          '_includes/*.html',
          '_posts/*.markdown',
          'index.html',
          '_config.yml'
        ],
        tasks: ['jekyll:prod'],
        // options: {
        //   livereload: true
        // }
      }
    },
// watch: {
//   livereload: {
//     files: [
//       '_site/css/main.css'
//     ],
//   jekyll: {
//     files: [
//       '_includes/*.html',
//       '_posts/*.markdown',
//       'index.html'
//     ],
//     tasks: ['jekyll:prod'],
//   },
//     options: {
//       livereload: true
//     }
//   }
// },

    concurrent: { // https://github.com/sindresorhus/grunt-concurrent
      target: {
        tasks: ['compass:prod', 'watch'],
          options: {
            logConcurrentOutput: true
          }
      }
    }

  });

  // grunt.loadNpmTasks('grunt-concurrent');
  // grunt.loadNpmTasks('grunt-jekyll');
  // grunt.loadNpmTasks('grunt-contrib-compass');
  // grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concurrent:target']);
};
