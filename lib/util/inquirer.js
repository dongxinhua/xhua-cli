const inquirer = require('inquirer')

const selector = async (config) => {
  return inquirer.prompt(config)
}

module.exports = selector