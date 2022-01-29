const chalk = require("chalk")

const log = (info) => {
  console.log(chalk.cyan(info))
}

const error = (info) => {
  console.log(chalk.red(info))
}

module.exports = {
  log,
  error,
}
