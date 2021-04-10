module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			contents: ['dist/*']
		},

		uglify: {
			options: {
				mangle: true,
				footer: 'uglify version: <%= pkg.version %>',
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			dist: {
				files: {
					'dist/publisher.min.js': ['app/publisher.js'],
					'dist/payload.min.js': ['app/payload.js']
				}
			}	
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['clean', 'uglify']);
};

/*  To run this gruntfile: grunt uglify */
