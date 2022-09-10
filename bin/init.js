/**
 * 项目克隆
 */

const { promisify } = require('util')
const ora = require('ora');
const download = promisify(require('download-git-repo'))
const shell = require('shelljs');
const chalk = require('chalk')
//日志打印函数
const log = content => console.log(chalk.yellow(content))
const logwhite = content => console.log(chalk.white(content))

//第一个参数：仓库地址
//第二个参数：下载路径
module.exports = async(downloadUrl,projectName) => {
  // log(`🚀 创建项目${projectName}
  // `)
  shell.rm('-rf', projectName)
  const spinner = ora(`🚀  初始化项目${projectName}`).start()
  try {
    await download(downloadUrl, projectName, { clone: true })
    spinner.succeed("初始化完成")
    logwhite(`
    🎉 Sucessfully created project ${chalk.green(projectName)}.
    👉 Get started with the following commands:

    ${chalk.gray(`$`)} ${chalk.cyan(`cd ${projectName}`)}
    ${chalk.gray(`$`)} ${chalk.cyan(`npm install`)}
    ${chalk.gray(`$`)} ${chalk.cyan(`npm run dev`)}
`)
  } catch (error) {
    log(`下载失败,请检查网络`, error)
    spinner.stop()
  }
}