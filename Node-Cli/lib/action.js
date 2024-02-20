const inquirer = require('inquirer')
const { framework } = require('../config')
const createAction = (project, other) => {
  // console.log(project, other)
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
      console.log('then', answers)
    })
    .catch((error) => {
      console.log('catch', error)
    })
}

module.exports = {
  createAction,
}
