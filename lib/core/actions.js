const { promisify } = require('util')
const path = require('path')

const download = promisify(require('download-git-repo'))
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs-extra')

const { repo_config } = require('../config/download-repo.js')
const selector = require('../util/inquirer.js')
const { pkmList, tempList } = require('../config/inquirer-config.js')
const { spawnCommand } = require('../util/terminal.js')
const { compile, writeFile, mkdirSync } = require('../util/file')

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
    if (pkm === 'npm' || pkm === 'cnpm') {
      fs.removeSync(`${project}/yarn.lock`)
    }
    spinner.stop()
  } catch (err) {
    spinner.fail(chalk.red('pull failed~'))
    return
  }

  // git init
  try {
    spinner.text = chalk.cyan(`git init...`)
    spinner.start()
    const command = process.platform === 'win32' ? `git.cmd` : 'git'
    await spawnCommand(command, ['init'], { cwd: `./${project}` })
    spinner.stop()
  } catch (err) {
    spinner.fail(chalk.red('init failed'))
    return
  }

  // 执行 npm 或 yarn install
  // window 执行需要后缀.cmd
  try {
    spinner.text = chalk.cyan(`${pkm} install...`)
    spinner.start()
    const command = process.platform === 'win32' ? `${pkm}.cmd` : pkm
    await spawnCommand(command, ['install'], { cwd: `./${project}` })
    spinner.stop()

    // 最后打印成功
    spinner.succeed(`Successfully created project ${chalk.cyan(project)}!`)
    console.log(`\n  cd ${chalk.cyan(project)}`)
    console.log(`  ${pkm} start\n`)
  } catch (err) {
    spinner.fail(chalk.red('install failed'))
    return
  }
}

const ejsToFile = async (name, dest, dirname, filename) => {
  // 编译 ejs 模板
  const cpnName = name.split('-').map(name => name.replace(name[0],name[0].toUpperCase())).join('')
  const res = await compile('vue-component.ejs', { name, cpnName })

  // 写入文件
  // console.log(dest, filename);
  mkdirSync(`${dest}/${dirname}`)
  const targetPath = path.resolve(dest, dirname, filename)
  // console.log(targetPath)
  writeFile(`${dirname}/${filename}`, targetPath, res)
}

const addComponentAction = async(name, dest) => {
  ejsToFile(name, dest, name, `index.vue`)
}

module.exports = {
  cloneProjectAction,
  addComponentAction,
}