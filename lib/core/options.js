const { program } = require('commander')
const figlet = require('figlet')

const setOptions = () => {
  program
    .option('-d, --dest', 'specify a folder')

  program.on('--help', () => {
    console.log(figlet.textSync('Xhua', {
      font: 'Standard',
      horizontalLayout: 'full',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true,
    }))
  })
}

module.exports = setOptions