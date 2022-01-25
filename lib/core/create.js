const { program } = require('commander')

const { cloneProjectAction } = require('./actions.js')

const createProject = () => {
  program
    .command('create <project>')
    .description('create a project in the folder')
    .action(cloneProjectAction)
}

module.exports = createProject