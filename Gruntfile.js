
module.exports = function(grunt) {
  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: 'public/javascripts/coffee/',
        src: ['*.coffee'],
        dest: 'public/javascripts/js/',
        ext: '.js'
      }
    },

    less: {
      development: {
        options: {
          paths: ["public/stylesheets/less/"]
        },
        files: {
          "public/stylesheets/css/main.css": "public/stylesheets/less/main.less",
          "public/stylesheets/css/questionnaire_list.css": "public/stylesheets/less/questionnaire_list.less",
          "public/stylesheets/css/questionnaire_detail.css": "public/stylesheets/less/questionnaire_detail.less",
          "public/stylesheets/css/questionnaire_create.css": "public/stylesheets/less/questionnaire_create.less"
        }
      }
    },

    // ejs: {
    //   all: {
    //     src: [
    //       'views/main_page.ejs',
    //       'views/questionnaire_list_page.ejs',
    //       'views/questionnaire_detail_page.ejs',
    //       'views/questionnaire_create_page.ejs'
    //     ],
    //     dest: 'views/test_mock_html/',
    //     expand: true,
    //     ext: '.html'
    //   }
    // },

    express: {
      dev: {
        options: {
          script: 'app.js'
        }
      }
    },

    watch: {
      express: {
        files: ['**/*.less', '**/*.ejs', '**/*.coffee', '**/*.js'],
        tasks: ['less', 'coffee', 'express:dev'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-ejs');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['less', 'coffee', 'express', 'watch']);
}