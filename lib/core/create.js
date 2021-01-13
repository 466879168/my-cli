const program = require('commander')

const {
  createProject
} =require('./actions')

const createCommands=()=>{
  //my create demo
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    //用户桥下命令执行action里面的函数
    .action(createProject)
    // .action((project,others)=>{
    //   console.log(project)
    //   console.log(others)
    // })
  //my create demo aa bb cc
  // program.command('create <project> [others...]')
  // program
  //   .command('addcpn <name>')
  //   .description('add vue component, 例如 my addcpn HelloWorld -d src/components')
  //   .action()
}

module.exports=createCommands