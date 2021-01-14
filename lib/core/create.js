const program = require('commander')

const {
  createProject,
  addCpnAction,
  addPageAndRoute,
  addStore
} =require('./actions')

const createCommands=()=>{
  //my create demo
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    //用户敲下命令执行action里面的函数
    .action(createProject)
    // .action((project,others)=>{
    //   console.log(project)
    //   console.log(others)
    // })
  //my create demo aa bb cc
  // program.command('create <project> [others...]')



  program
    .command('addcpn <name>')
    .description('add vue component, 例如 my addcpn HelloWorld [-d src/components]')
    .action((name)=>{
      addCpnAction(name,program.dest||'src/components')
    })




  program
      .command('addpage <page>')
      .description('add vue page and router config, 例如my addpage Home [-d src/pages]')
      .action((page)=>{
        addPageAndRoute(page,program.dest||'src/page')
      })


  program
      .command('addstore <store>')
      .description('add vuex module store , 例如my addstore Home [-d src/store/modules]')
      .action((store)=>{
        addStore(store,program.dest||'src/store/modules')
      })
}


module.exports=createCommands