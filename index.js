#! /usr/bin/env node

const { program } = require('commander')

const setOptions = require('./lib/core/options.js')
const createProject = require('./lib/core/create.js')

// 打印版本
program.version(require("./package.json").version)

// 配置help信息
setOptions()

// 创建项目
createProject()

program.parse(process.argv)