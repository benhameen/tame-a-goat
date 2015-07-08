'use strict';
var timer = require('grunt-timer');

module.exports = function(grunt) {
  timer.init(grunt, {deferLogs: true, friendlyTime: true});

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.initConfig({
    // Clean destination path
    clean: {
      options: {
        force: true
      },
      dev: {
        src: 'build/'
      }
    },

    // Copy static files
    copy: {
      static: {
        expand: true,
        cwd: 'app/static',
        src: ['**/*'],
        dest: 'build/',
        filter: 'isFile'
      }
    },

    // Compile Jade for build
    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'app/jade/',
          src: ['**/*.jade', '!mixins/*'],
          dest: 'build/',
          ext: '.html'
        }]
      }
    },

    // Lint Sass
    scsslint: {
      allFiles: [
        'app/sass/**/*.scss'
      ],
      options: {
        compact: true,
        config: '.scss-lint.yml'
      }
    },

    // Compile Sass for build
    sass: {
      options: {
        sourcemap: 'none'
      },
      index: {
        files: {
          'build/css/index.css': 'app/sass/index.scss'
        }
      }
    },

    // Add vendor prefixes to CSS if needed
    autoprefixer: {
      options: {
        // browsers: ['last 2 Chrome versions']
      },
      autoprefix: {
        src: ['build/css/index.css']
      }
    },

    // Run JSHint on JS code
    jshint: {
      options: {
        jshintrc: true
      },
      all: ['Gruntfile.js', 'app/js/**/*.js']
    },

    // Browserify JS for build
    browserify: {
      options: {
        transform: ['debowerify'],
        watch: true, // use watchify for incremental builds
        browserifyOptions : { debug : true } // source mapping
      },
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/js/bundle.js'
      },
      test: {
        src: ['test/angular/**/*.js'],
        dest: 'test/testbundle.js'
      },
      production: {
        options: { watch: false },
        src: ['app/js/**/*.js'],
        dest: 'build/js/bundle.js'
      }
    },

    // Minify CSS for production
    cssmin: {
      dist: {
        files: {
          'build/css/index.min.css': ['build/css/index.css']
        }
      }
    },

    // Uglify JS for production
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'build/js/bundle.min.js': ['build/js/bundle.js']
        }
      }
    },

    // update script tags to minified versions for production
    'string-replace': {
      prod: {
        src: 'build/*.html',
        dest: 'build/',
        options: {
          replacements: [{
            pattern: 'editor.css',
            replacement: 'editor.min.css'
          }, {
            pattern: 'index.css',
            replacement: 'index.min.css'
          }, {
            pattern: 'bundle.js',
            replacement: 'bundle.min.js'
          }]
        }
      }
    },

    // // karma unit tests
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    // Watch
    watch: {
      options: {
        spawn: false 
        /* Speeds up the reaction time of the watch (usually 500ms faster for most) and allows subsequent task runs to share the same context... can make the watch more prone to failing so please use as needed. */
      },
      configFiles: {
        files: ['Gruntfile.js'],
        options: { reload: true }
      },
      jade: {
        files: [
          'app/jade/**/*'
        ],
        tasks: ['jade']
      },
      sass: {
        files: [
          'app/sass/**/*'
        ],
        tasks: ['scsslint', 'sass', 'autoprefixer']
      },
      jshint: {
        files: [
          'app/js/**/*.js'
        ],
        tasks: ['jshint:all']
      },
      static: {
        files: [
          'app/static/**/*'
        ],
        tasks: ['copy:static']
      }
    }
  });

  // Default tasks(s)
  grunt.registerTask('build', [
    'copy:static',
    'jade',
    'scsslint',
    'sass',
    'autoprefixer',
    'jshint:all',
    'browserify:dev',
  ]);

  grunt.registerTask('build-minify', [
    'copy:static',
    'jade',
    // 'htmlmin',
    'scsslint',
    'sass',
    'autoprefixer',
    'cssmin',
    'jshint:all',
    'browserify:production',
    'uglify',
    'clean:bundle',
    'string-replace',
  ]);

  grunt.registerTask('prod', [
    'clean:dev',
    'build-minify'
  ]);

  grunt.registerTask('test', [
    'browserify:test',
    'karma:unit'
  ]);

  grunt.registerTask('testwatch', [
    'test'
  ]);

  grunt.registerTask('default', [
    'clean:dev',
    'build',
    'watch'
  ]);

};
