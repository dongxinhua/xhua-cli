const { spawn } = require('child_process')

const spawnCommand = (command, args, options) => {
  return new Promise((resolve) => {
    const childProcess = spawn(command, args, options)
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  spawnCommand,
}