const fs = require('fs')
const path = require('path');
const basePath = path.join(__dirname,'/file')
console.log(basePath,'basePath')
let mergedData = ''
function readTheFile(basePath){
    // 读取文件
    if(fs.existsSync(basePath)){
        // 如果存在
        const stats = fs.statSync(basePath); // 是文件还是文件夹
        if(stats.isDirectory()){
            const files = fs.readdirSync(basePath)
            
            //过滤文件
            const fileJSON = files.filter( f => f.endsWith('.json'))
            fileJSON.forEach( fileElement =>{
                const fileJSONPath = path.join(basePath,fileElement);
                try {
                     const file_content = fs.readFileSync(fileJSONPath, {encoding:'utf-8',flag:'r'})
                     if(file_content){
                        const jsonStr = file_content.trim().replace(/^{|}$/g,'')
                      // 替换多余的空白行或换行符为逗号，并移除前后的逗号
                      const cleanedStr = jsonStr.replace(/\s*\n\s*/g, ',').replace(/,$/, '');
                      // 将清理后的内容添加到合并的字符串中
                       mergedData += cleanedStr + ',';
                     }
                } catch (error) {
                    
                }

            })
            // 处理成json
            const totalArray = mergedData.split(',').filter( r => r !== '')
            // 将 totalArray 转换为有效的 JSON 字符串
            const totals = totalArray.map(res =>(res.replace(/"/g,'')))
            const finallyArs = totals.map(item => {
                const [key, value] = item.split(':').map(str => str.trim());
                return `"${key}": "${value}"`; // 确保值也用双引号包裹
            });
            // 拼接为 JSON 字符串
            const list = finallyArs.join(',')
            // 解析成对象
            const totalJSON = `{${list}}`;
            const obj = JSON.parse(totalJSON);
            // 判断当前目录有没有指定文件
            const targetFile = path.join(__dirname,'target_file')
              // 获取文件夹状态
              if(!fs.existsSync(targetFile)){
                // 如果没有就创建文件夹
                  fs.mkdirSync(targetFile,{ recursive: true})
                  //往里面写入Json文件 1 先创建 a.json 然后将obj 写入进去
                  const targetDir = path.join(targetFile,'a.json')
                  fs.writeFileSync(targetDir,JSON.stringify(obj, null , 4),'utf-8')
                  console.log("成功写入！")
            }else{
                console.log('file has exit')
                //如果删除它
                const files = fs.readdirSync(targetFile)
                if( files.length > 0){
                    //非空文件夹
                    fs.rmSync(targetFile,{recursive:true})
                }else{
                    // 空的文件
                    fs.rmdirSync(targetFile)
                }
            }

        }else {
            console.log('2')
        }
    }else{

    }
}

readTheFile(basePath)