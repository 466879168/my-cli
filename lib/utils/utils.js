const ejs=require('ejs')
const path=require('path')
const fs=require('fs')
// const {promisify}=require('util')

// const renderFilePromise=promisify(ejs.renderFile)

const compile=(name,data)=>{
  const templatePosition=`../templates/${name}`
  const templatePath=path.resolve(__dirname,templatePosition)
  return new Promise((resolve,reject)=>{
    ejs.renderFile(templatePath,{data},{},(err,result)=>{
      if (err) {
        console.log(err)
        return
      }
      resolve(result)
    })
  })  
}

//没有目录创建目录方法
//source/components/category/why
const createDirSync=(pathName)=>{
  if (fs.existsSync(pathName)){
    return true
  }else{
    if (createDirSync(path.dirname(pathName))){
      fs.mkdirSync(pathName)
      return true
    }
  }
}

//写入函数
const writeToFile=(path,content)=>{
    return fs.promises.writeFile(path,content)
}

module.exports={
  compile,
  writeToFile,
  createDirSync
}