//将回调函数转化为promise
const {promisify}=require('util')

const path=require('path')

const download=promisify(require('download-git-repo'))  

const open=require('open')

const {vueRepo} = require('../config/repo-config')

const {commandSpawn} = require('../utils/terminal')

const {compile,writeToFile,createDirSync} =require('../utils/utils')

//callback-->promisufy(函数)-->Promise-->async await
const createProject=async (project)=>{
  console.log('my helps you create your project, please wait a moment~')
  //1. clone项目
  //使用download-git-repo
  await download(vueRepo,project,{clone:true})
  //2. 执行npm install
  //window上使用npm会报错 要用npm.cmd
  const command=process.platform === 'win32'?'npm.cmd':'npm'
  console.log(command)
  await commandSpawn(command,['install'],{cwd:`./${project}`})
  //3. 运行 npm run serve
  console.log('运行npm run serve')
  commandSpawn(command,['run','serve'],{cwd:`./${project}`})
  //4. 打开浏览器
  console.log('打开浏览器啦')
  open('http://localhost:8080')
}

//添加组件的action
const addCpnAction =async (name,dest)=>{
  // 1. 对应的ejs模板
  //在template目录里面
  // 2. 编译ejs模板--得到result字符串
  const result = await compile("vue-component.ejs",{name,lowerName:name.toLowerCase()})
  console.log(result)
  //写入文件的操作
  // 3. 将result写入到.vue文件中
  // 4. 放到对应的文件中
  const targetPath=path.resolve(dest,`${name}.vue`)
  writeToFile(targetPath,result)

}

//添加组件和路由
const addPageAndRoute=async (name,dest)=>{
  //1. 编译ejs模板
  const data={name,lowerName:name.toLowerCase()}
  const pageResult=await compile('vue-component.ejs',data)
  const routeResult=await compile('vue-route.ejs',data)

  //2. 写入文件
  const targetDest=path.resolve(dest,name.toLowerCase())
  if (createDirSync(dest)){
    const targetPagePath=path.resolve(targetDest,`${name}.vue`)
    const targetRoutePath=path.resolve(targetDest,'router.js')
    writeToFile(targetPagePath,pageResult)
    writeToFile(targetRoutePath,routeResult)
  }
}

//添加module store
const addStore=async (name,dest)=>{
  //编译
  const storeResult=await compile('vue-store.ejs',{})
  const typesResult=await compile('vue-types.ejs',{})

  //创建文件
  const targetDest=path.resolve(dest,name.toLowerCase())
  if (createDirSync(dest)){
    const targetStorePath=path.resolve(targetDest,`${name}.js`)
    const targetTypesPath=path.resolve(targetDest,'types.js')
    writeToFile(targetStorePath,storeResult)
    writeToFile(targetTypesPath,typesResult)
  }
}



module.exports={
  createProject,
  addCpnAction,
  addPageAndRoute,
  addStore
}