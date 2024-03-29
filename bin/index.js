#!/usr/bin/env node

//使用node开发命令行工具所执行的 javascript 脚本必须在顶部加入#!/usr/bin/env node 声明
/** 
 * 开发后台脚手架，快速生成标准后台架构
 * @author echo4353
*/
const program = require('commander')
const inquirer = require('inquirer');
const { promisify } = require('util')
const asyncFiglet= promisify(require('figlet'))
const chalk = require('chalk')
const init = require('./init')
//日志打印函数
const log = content =>console.log(chalk.yellow(content))
//设置版本和参数
program.version('1.0.0')
program.option('-n --name <type>','output name')

// 打印LOGO
async function printLogo () {
  const data = await asyncFiglet('welcome-su-cli')
  log(data);
}

const templates = {
  viteAdmingithub: 'https://github.com:echo4353/vite-admin-demo#main',
  v3Admingitlab: 'http://ent-code.corp.36kr.com/frontend/vue3-sso-demo.git',
}
program
  .command('create <app-name>')
  .description('创建Vue项目')
  .action(async (name) => {
    await printLogo()
    // log('准备创建项目...');
    const answer = await inquirer.prompt([
      {
        name:"vueVersion",
        type:"list",
        message: "Please pick a preset:",
        choices:["Default (vue3+vite2+elementPlus)","Gitlab vue3 admin","Manually select features"]
      }
    ])
    if (answer.vueVersion == "Default (vue3+vite2+elementPlus)") {
      //下载框架
      init(templates['viteAdmingithub'],name)
    } else if (answer.vueVersion == "Gitlab vue3 admin") {
      init(templates['v3Admingitlab'],name)
    }else if (answer.vueVersion == "Manually select features") {
      await inquirer.prompt([
      {
        name:"state",
        type:"checkbox",
        message: "Check the features needed for your project:",
        choices:[{ name: 'Babel', value: 1,checked: true, },"TypeScript","Progressive Web App (PWA) Support",{ name: 'Router', value: 4,checked: true, },{ name: 'Vuex', value: 5 },'Pinia','CSS Pre-processors','Linter / Formatter','Unit Tsting','E2E Testing']
      },
      ])
      log('敬请期待...😁');
    }
    
})

//参数解析
program.parse(process.argv)