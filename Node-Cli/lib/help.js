const myHelp = function (program) {
  program
    .option('-d, --debug', '是否开启调试模式', true)
    .option('-e, --envName <envName>', '获取环境变量名称') // 创建 envName 命令
}

module.exports = { myHelp }
