const fs = require('fs');
const path = require('path');

function getDir(directoryPath) {
  const result = [];
  // 读取目录下的所有文件和目录
  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // 过滤出所有的目录
    const subdirectories = files.filter((file) => file.isDirectory());

    // 打印所有的目录名
    subdirectories.forEach((subdirectory) => {
      result.push(path.join(directoryPath, subdirectory.name));
    });
  });
  return result;
}

module.exports = { getDir };
