const program = require('commander')

const {
  createProjectAction
} =require('./actions')

const createCommands=()=>{
  //my create demo
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    //用户桥下命令执行action里面的函数
    .action(createProjectAction)
    // .action((project,others)=>{
    //   console.log(project)
    //   console.log(others)
    // })
  //my create demo aa bb cc
  // program.command('create <project> [others...]')
}

module.exports=createCommands