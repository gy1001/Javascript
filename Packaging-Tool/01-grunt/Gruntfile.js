module.exports = function (grunt) {
  // 1. 加载 babel 任务
  grunt.loadNpmTasks('grunt-babel')
  // 2. 初始化配置文件
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env'],
      },
      dist: {
        files: {
          'dist/js/app.js': 'src/js/app.js',
        },
      },
    },
  })
  // default 指的是入口任务
  grunt.registerTask('default', ['babel'])
}
