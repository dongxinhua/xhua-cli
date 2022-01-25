#! /usr/bin/env node

const { program } = require('commander')

const setOptions = require('./lib/core/options.js')

// 打印版本
program.version(require("./package.json").version)

// 配置help信息
setOptions()

program.parse(process.argv)