#! /usr/bin/env node
// if(process.argv[2]=='--help'){
//   console.log("这里获取的 --help命令行参数")
// }

const {program} = require("commander")

program
  .option("-d, --debug", "是否开启调试模式", true)
  .option('-e, --envName <envName>', '获取环境变量名称') // 创建 envName 命令

// 创建 create 命令
program
  .command("create <project> [other...]")
  .alias("crt") // 别名
  .description("创建项目")
  .action((project, other) => {
    console.log(project, other)
  })

program.parse(process.argv); // 解析参数