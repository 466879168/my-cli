const program=require('commander')

const helpOptions=()=>{
  //增加自己的option
  program.option('-m --my','a my cli')
  program.option('-d --dest <dest>','a destination folder,例如 -d /src/components')
  program.option('-f --framework <framework>','your frameword')

//箭筒某个指令
  program.on('--help',function(){
    console.log('')
    console.log('Other')
    console.log('other options')
  })
}

module.exports=helpOptions