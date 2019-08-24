//保存图片函数

const fs=require("fs");
const path=require("path");

module.exports= function save(imgName,imgPath){
    return new Promise((resolve,reject)=>{
        fs.readFile(imgPath,(err,buffer)=>{
            if(err){
                reject("头像读取失败，请重试")
            }else{
                fs.writeFile(path.join(process.cwd(),"app/public",imgName),buffer,(error)=>{
                    if(error){
                        reject("头像上传失败，请重试")
                    }else{
                        resolve("上传成功")
                    }
                })
            }
        })
    })
}