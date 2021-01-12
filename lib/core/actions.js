//将回调函数转化为promise
const {promisify}=require('util')

const download=promisify(require('download-git-repo'))  

const {vueRepo} = require('../config/repo-config')

//callback-->promisufy(函数)-->Promise-->async await
const createProjectAction=async (project)=>{
  //1. clone项目
  //使用download-git-repo
  await download(vueRepo)
  //2. 执行npm install
  //3. 运行 npm run serve
  //4. 打开浏览器
}



module.exports={
  createProjectAction
}