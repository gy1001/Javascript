const ora = require('ora')

const spinner = ora('正在下载模板...')

spinner.text = '这是一条提示信息'
spinner.start()

setTimeout(() => {
  // spinner.succeed('下载完成')
  // spinner.fail('下载失败')
  spinner.info('下载中...')
}, 3000)
