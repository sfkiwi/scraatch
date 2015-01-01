/**
 * @fileoverview The Gruntfile.
 * Loads grunt npm module dependencies and specifies grunt tasks and task
 * configurations.
 */


/**
 * The Grunt export function.
 * @param {global.Grunt} grunt The grunt object.
 */
module.exports = function(grunt) {

  /**
   * Project configuration.
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /**
     * Externs declarations.
     */
    externs: grunt.file.expand(
        'client/utils/externs.js',
        'client/js/closure/externs/*.js'
    ).join(' '),

    /**
     * The default entry point to the application.
     */
    app: 'client/app.js',

    /**
     * JS application minification: closure.
     */
    closure: grunt.file.expand(
        'client/js/closure/library/**/*.js',
        '!client/js/closure/library/**/*_test.js'
    ).join(' '),

    /**
     * JS application minification: modules.
     */
    modules: grunt.file.expand(
        'client/js/controllers-module.js'
    ).join(' '),

    /**
     * JS application minification: controllers.
     */
    controllers: 'client/js/main-controller.js',

    /**
     * JS application minification: constants.
     */
    constants: 'client/utils/constants.js',

    /**
     * JS application minification: constants.
     */
    gruntfile: 'Gruntfile.js',

    /**
     * JS application minification: libraries.
     */
    thirdParty: grunt.file.expand(
        'client/js/angular/angular.min.js',
        'client/js/angular/angular-route.min.js',
        'client/js/angular/angular-sanitize.min.js',
        'client/js/angular/angular-animate.min.js'
    ).join(' '),

    /**
     * JS application inification: components.
     */
    components: grunt.file.expand(
        'client/components/apiproxy/*.js',
        'client/components/config/*.js',
        'client/components/db/*.js',
        'client/components/routes/*.js',
        '!client/components/**/*_test.js'
    ).join(' '),

    /**
     * JS application minification: views.
     */
    views: grunt.file.expand(
        'client/views/landingview/*.js',
        '!app/views/**/*_test.js'
    ).join(' '),

    /**
     * Compile Sass to CSS.
     */
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'client/css/app.css': 'client/css/app.scss'
        }
      }
    },

    /**
     * Sort Sass properties alphabetically.
     */
    prettysass: {
      options: {
        alphabetize: true,
        indent: 2
      },
      app: {
        src: ['client/css/*.scss', 'client/views/**/*.scss']
      },
    },

    /**
     * Adds vendor prefixed styles.
     */
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: {
          'client/css/app.css': 'client/css/app.css'
        }
      }
    },

    /**
     * Runs the Google closure compilation jar file (in the repository).
     * This shell command is automatically run on deafult 'grunt' and
     * subsequently everytime a file in components, views, or js is saved.
     * Depends on the grunt-shell npm module.
     * This command creates the app.min.js.
     * Usage:
     *   Run with 'grunt'.
     */
    shell: {
      min: {
        command: 'java -jar client/js/closure/compiler.jar ' +
            // SIMPLE_OPTIMIZATIONS, ADVANCED_OPTIMIZATIONS, WHITESPACE_ONLY
            '--compilation_level SIMPLE_OPTIMIZATIONS ' +
            '--language_in ECMASCRIPT5_STRICT ' +
            '--angular_pass ' +
            '--generate_exports ' +
            '--manage_closure_dependencies ' +
            '--js client/js/closure/library/base.js ' +
            '--js <%= closure %> ' +
            '--js <%= app %> ' +
            '--js <%= modules %> ' +
            '--js <%= controllers %> ' +
            '--js <%= components %> ' +
            '--js <%= constants %> ' +
            '--js <%= views %> ' +
            '--js_output_file client/js/app.min.js ' +
            '--externs <%= externs %> '
      },
      minThirdParty: {
        command: 'java -jar client/js/closure/compiler.jar ' +
            '--compilation_level WHITESPACE_ONLY ' +
            '--language_in ECMASCRIPT5_STRICT ' +
            '--js <%= thirdParty %> ' +
            '--externs <%= externs %> ' +
            '--js_output_file client/js/app-third-party.min.js '
      },
      startServer: {
        command: 'dev_appserver.py .'
      },
      gjslint: {
        command: 'gjslint ' +
            '--strict ' +
            '--limited_doc_files="<%= externs %>" ' +
            '--closurized_namespaces="goog,ng" ' +
            '--exclude_files="<%= externs %>" ' +
            '<%= app %> ' +
            '<%= modules %> ' +
            '<%= controllers %> ' +
            '<%= components %> ' +
            '<%= constants %> ' +
            '<%= libraries %> ' +
            '<%= views %> ' +
            '<%= gruntfile %>'
      },
      fixjsstyle: {
        command: 'fixjsstyle ' +
            '--strict ' +
            '--limited_doc_files="<%= externs %>" ' +
            '--closurized_namespaces="goog,ng" ' +
            '--exclude_files="<%= externs %>" ' +
            '<%= app %> ' +
            '<%= modules %> ' +
            '<%= controllers %> ' +
            '<%= components %> ' +
            '<%= constants %> ' +
            '<%= libraries %> ' +
            '<%= views %> ' +
            '<%= gruntfile %>'
      },
      pylint: {
        command: 'pylint ' +
            '--rcfile=server/pylint.rc ' +
            'server '
      },
      test: {
        command: 'python run_tests.py /usr/local/google_appengine ./server'
      }
    },

    /**
     * Watches for changes in files in components, views, and js
     * and runs the shell:min task everytime a file is saved.
     * This is useful for not having to use the terminal everytime
     * a file is saved. Part of the default grunt task.
     * Usage:
     *   Run with 'grunt'.
     */
    watch: {
      css: {
        files: [
          'client/components/**/*.scss',
          'client/views/**/*.scss',
          'client/css/*.scss'
        ],
        tasks: ['sass', 'autoprefixer'],
        options: {
          spawn: false
        }
      },
      components: {
        files: [
          'client/components/**/*.js'
        ],
        tasks: ['shell:min'],
        options: {
          spawn: false
        }
      },
      js: {
        files: [
          'client/utils/**/*.js'
        ],
        tasks: ['shell:min'],
        options: {
          spawn: false
        }
      },
      views: {
        files: [
          'client/views/**/*.js'
        ],
        tasks: ['shell:min'],
        options: {
          spawn: false
        }
      }
    },

    /**
     * Concatenates and minifies all CSS into app.min.css.
     * Usage:
     *   Automatically is run with 'grunt'.
     */
    cssmin: {
      combine: {
        files: {
          'client/css/app.min.css': [
            'client/css/app.css'
          ]
        }
      }
    }
  });

  /**
   * Load the npm modules.
   */
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-prettysass');

  /**
   * The default grunt task.
   * Usage:
   *   run with 'grunt' in console.
   */
  grunt.registerTask('default', [
    'shell:min',
    'shell:minThirdParty',
    'sass',
    'autoprefixer',
    'cssmin',
    'watch'
  ]);

  /**
   * The lint grunt task.
   * Usage:
   *   run with 'grunt lint' in console.
   */
  grunt.registerTask('gjslint', [
    'shell:gjslint'
  ]);

  /**
   * The fixjs grunt task.
   * Usage:
   *   run with 'grunt fixjs' in console.
   */
  grunt.registerTask('fixjsstyle', [
    'shell:fixjsstyle'
  ]);

  /**
   * The pylint grunt task.
   * Usage:
   *   run with 'grunt pylint' in console.
   */
  grunt.registerTask('pylint', [
    'shell:pylint'
  ]);

  /**
   * The test grunt task.
   * Usage:
   *   run with 'grunt test' in console.
   */
  grunt.registerTask('test', [
    'shell:test'
  ]);

  /**
   * Build sass files into css and watch for further changes
   * Usage:
   *    run with 'grunt buildcss' in console.
   */
  grunt.registerTask('buildcss', ['sass', 'autoprefixer', 'watch:css']);
};
