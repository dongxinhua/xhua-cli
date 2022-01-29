const ejs = require('ejs')
const path = require('path')
const fs = require('fs-extra')
const { error } = require('../util/chalk')

const compile = (templateName, data = {}, options = {}) => {
  const templatePosition = `../template/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, options, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

const writeFile = (filename, path, content) => {
  // 该文件是否已创建
  if (fs.existsSync(path)) {
    error(`${filename} already exists.`)
    return
  }
  return fs.promises.writeFile(path, content)
}

const mkdirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    // 不存在,判断父级文件夹是否存在?
    if (mkdirSync(path.dirname(dirname))) {
      // 存在父级文件夹，就直接新建该文件
      fs.mkdirSync(dirname)
      return true
    }
  }
}

module.exports = {
  compile,
  writeFile,
  mkdirSync,
}