module.exports = function(grunt) {
 
  // configure the tasks
  grunt.initConfig({
 
    copy: {
      build: {
        cwd: 'source',
        src: [ '**/*.js' ],
        dest: 'build',
        expand: true
      },
    },
    clean: {
      build: {
        src: [ 'build' ]
      },
      scripts: {
        src: [ 'build/**/*.js', '!build/templates.js' ]
      },
    },
    uglify: {
      build: {
        options: {
          mangle: false
        },
        files: {
          'build/templates.js': [ 'build/**/*.js' ]
        }
      }
    },
    watch: {
	  build: {
	    files: [ 'source/**/*.js' ],
	    tasks: [ 'build' ]
	  }
	},
  });
 
  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // define the tasks
   grunt.registerTask(
    'build', 
    'Copies the files to the build directory, concatenates the JavaScript files, and cleans the non-concatenated JavaScript files.', 
    [ 'clean:build' , 'copy', 'uglify' , 'clean:scripts']
  );

  grunt.registerTask(
  	'default', 
  	'Watches the project for changes, automatically builds them and runs a server.', 
  	[ 'build' , 'watch' ]
  );

};