const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')
const downloadFunc = function (url, dest) {
  const spinner = ora('正在下载模板...')
  spinner.start()
  download(url, dest, { clone: true }, (err) => {
    if (err) {
      spinner.fail('下载失败')
      return
    }
    spinner.succeed('下载完成')
    console.log(chalk.blue(`请使用 cd ${dest} 进入项目`))
    console.log('并使用 npm install 或 yarn 安装依赖')
    console.log('然后使用 npm run dev 或 yarn dev 启动项目')
  })
}

module.exports = {
  downloadFunc,
}
