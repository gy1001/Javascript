const inquirer = require('inquirer')
const { framework, frameworkUrl } = require('../config')
const { downloadFunc } = require('./download')

const createAction = (project, other) => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'framework',
        choices: framework,
        message: '请选择你要使用的框架',
      },
    ])
    .then((answers) => {
      const url = frameworkUrl[answers.framework]
      downloadFunc('direct:' + url, project)
    })
    .catch((error) => {
      console.log('catch', error)
    })
}

module.exports = {
  createAction,
}
