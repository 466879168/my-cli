#!/usr/bin/env node


//npm link
//shebang/hashbang
// console.log('my cli')
const program = require('commander')

const helpOptions=require('./lib/core/help')
const createCommands = require('./lib/core/create')

//查看版本号
program.version(require('./package.json').version);
program.version(require('./package.json').version,'-v,--version');

//帮助和可选信息
helpOptions()
//创建其他的指令
createCommands()

program.parse(process.argv)

console.log(program.dest)