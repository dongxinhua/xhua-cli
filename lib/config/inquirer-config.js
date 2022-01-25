const chalk = require('chalk')

const pkmList = [
  {
    name: 'pkm',
    type: 'list',
    message: chalk.cyan('Select a packageManager'),
    choices: [
      {
        name: 'npm',
        value: 'npm'
      },
      {
        name: 'cnpm',
        value: 'cnpm'
      },
      {
        name: 'yarn',
        value: 'yarn'
      }
    ]
  }
]

const tempList = [
  {
    name: 'temp',
    type: 'list',
    message: chalk.cyan('Select a template'),
    choices: [
      {
        name: 'vue2',
        value: 'vue2'
      },
      {
        name: 'vue3',
        value: 'vue3'
      },
      {
        name: 'react',
        value: 'react'
      }
    ]
  }
]

module.exports = {
  pkmList,
  tempList,
}