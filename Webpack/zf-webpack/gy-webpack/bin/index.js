#! /usr/bin/env node

const path = require('path')

const config = require(path.resolve(process.cwd(), './webpack.config.js'))

const Compiler = require('../lib/Compiler')
const compiler = new Compiler(config)

compiler.run()
