// Karma configuration
// Generated on Wed Mar 04 2015 13:49:15 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/static/js/jquery-2.1.3.min.js',
      'https://cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS_HTML',
      'test/shared/ckeditor-mhe/ckeditor.js',
      'test/shared/ckeditor-mhe/adapters/jquery.js',
      'app/static/js/s9-widget.js',
      'app/static/js/spectrum.js',
      'test/*bundle.js'
    ],

    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // 'test/*bundle.js': ['coverage'],
      // 'app/js/controllers/**/*.js': ['coverage'],
      // 'app/js/services/**/*.js': ['coverage']
      // 'app/js/**/*.js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // configure the reporter
    coverageReporter: {
      type : 'text'
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'], // using headless browser to speed things up and avoid chrome window popping up

    // customLaunchers: {
    //   ChromeHidden: {
    //     base: 'Chrome',
    //     flags: ['--no-startup-window']
    //   }
    // },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
