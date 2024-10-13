import { exec } from "child_process";
import chalk from "chalk"
import readline from "readline";


const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})


const askQuestion =()=>{
    rl.question(chalk.blue("请输入内容"), answer =>{
        if(answer === 'node test.js'){
            exec(answer, (error,stdout,stdin) =>{
                  if(error){
                    // 控制台打印出
                    rl.close()
                    return
                  }
                  if(stdin){
                    return console.log(`this is ${stdin}`)
                  }
                  console.log(chalk.red(`${stdout}`))
            })
        }else {
            // 继续输入命令
            console.log(chalk.red("请输入命名不对"))
            askQuestion()
        }
    // 当用户输入一行时
    rl.on('line', (input) => {
        console.log(`您输入了: ${input}`);
        if (input === 'exit') {
            rl.close();
        }
    });

    // 监听 SIGINT 事件（Ctrl+C）
    rl.on('SIGINT', () => {
        console.log('检测到 Ctrl+C，程序即将退出。');
        rl.close();
    });

    // 监听暂停（Ctrl+Z）
    rl.on('SIGTSTP', () => {
        console.log('程序暂停，按 fg 恢复。');
    });

    // 恢复时的操作
    rl.on('SIGCONT', () => {
        console.log('程序继续运行...');
    });

    // 当 readline 接口暂停时
    rl.on('pause', () => {
        console.log('readline 已暂停');
    });

    // 当 readline 接口恢复时
    rl.on('resume', () => {
        console.log('readline 已恢复');
    });
    })

}

askQuestion()
