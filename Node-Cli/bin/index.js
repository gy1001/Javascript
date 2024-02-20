#! /usr/bin/env node
const { program } = require('commander')
const { myHelp } = require('../lib/help')
const { createCommander } = require('../lib/commander')
myHelp(program)
createCommander(program)

program.parse(process.argv) // 解析参数
