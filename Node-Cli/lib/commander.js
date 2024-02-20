const { createAction } = require('./action')
const createCommander = function (program) {
  // 创建 create 命令
  program
    .command('create <project> [other...]')
    .alias('crt') // 别名
    .description('创建项目')
    .action(createAction)
}

module.exports = { createCommander }
