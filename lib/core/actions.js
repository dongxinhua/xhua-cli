const { promisify } = require('util')

const download = promisify(require('download-git-repo'))
const ora = require('ora')
const chalk = require('chalk')

const { repo_config } = require('../config/download-repo.js')
const selector = require('../util/inquirer.js')
const { pkmList, tempList } = require('../config/inquirer-config.js')
const { spawnCommand } = require('../util/terminal.js')

const cloneProjectAction = async(project) => {
  // 选择 yarn 或者 npm
  const { pkm } = await selector(pkmList)

  // 选择模板
  const { temp } = await selector(tempList)

  const spinner = ora(chalk.cyan('Pulling code...'))

  // 从远程拉取代码
  try {
    spinner.start()
    if (!repo_config.get(temp)) {
      spinner.warn(chalk.yellow(`Sorry, we can't provide ${temp} service at the moment, waiting for upgrade~`))
      return
    }
    await download(repo_config.get(temp), project, { clone: true })
    spinner.stop()
  } catch (err) {
    spinner.fail(chalk.red('pull failed~'))
    return
  }

  // 执行 npm 或 yarn install
  // window 执行需要后缀.cmd
  // spinner.text = chalk.cyan(`${pkm} install...`)
  const command = process.platform === 'win32' ? `${pkm}.cmd` : pkm
  await spawnCommand(command, ['install'], { cwd: `./${project}` })

  // 最后打印成功
  spinner.succeed('Success!')
}

module.exports = {
  cloneProjectAction,
}