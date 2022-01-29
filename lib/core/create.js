const { program } = require('commander')

const {
  cloneProjectAction,
  addComponentAction,
} = require('./actions.js')

const createProject = () => {
  program
    .command('create <project>')
    .description('create a project in the folder')
    .action(cloneProjectAction)

  program
    .command('addvuecpn <name>')
    .description('create a vue component')
    .action((name) => {
      addComponentAction(name, program.opts().dest || 'src/common/components')
    })
}

module.exports = createProject