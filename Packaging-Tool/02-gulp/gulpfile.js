const gulp = require("gulp");
const babel = require("gulp-babel");

function defaultTask(callback) {
  gulp
    // 读取源文件
    .src("src/app.js")
    .pipe(
      // 传给 babel 任务
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(gulp.dest("dist"));
  callback();
}
exports.default = defaultTask;
