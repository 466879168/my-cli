//将回调函数转化为promise
const {promisify}=require('util')

const download=promisify(require('download-git-repo'))  

const open=require('open')

const {vueRepo} = require('../config/repo-config')

const {commandSpawn} = require('../util/terminal')

//callback-->promisufy(函数)-->Promise-->async await
const createProjectAction=async (project)=>{
  console.log('my helps you create you project~')
  //1. clone项目
  //使用download-git-repo
  await download(vueRepo,project,{clone:true})
  //2. 执行npm install
  //window上使用npm会报错 要用npm.cmd
  const command=process.platform === 'win32'?'npm.cmd':'npm'
  await commandSpawn(command,['install'],{cwd:`./${project}`})
  //3. 运行 npm run serve
  commandSpawn(command,['run','serve'],{cwd:`./${project}`})
  //4. 打开浏览器
  open('http://localhost:8080')
}



module.exports={
  createProjectAction
}