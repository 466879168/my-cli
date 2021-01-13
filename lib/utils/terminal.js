/**
 * 执行终端相关命令的代码
 */

const { spawn } = require("child_process");

const commandSpawn = (...args) => {
  const childProcess = spawn(...args);
  return new Promise((resolve, reject) => {
    //在控制台输出打印信息
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on("close", () => {
      resolve();
    });
  });
};

module.exports = {
  commandSpawn,
};
