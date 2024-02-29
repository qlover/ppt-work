const fs = require('fs');
const path = require('path');

function replaceFilesName(directoryPath, oldName, newName) {
  // 读取目录下的所有文件和目录
  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // 遍历所有文件和目录
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file.name);

      // 如果是目录，则递归替换该目录下的所有文件名
      if (file.isDirectory()) {
        replaceFilesName(filePath, oldName, newName);
      } else {
        // 如果文件名包含要替换的字符串，则替换文件名
        if (file.name.includes(oldName)) {
          const newFileName = file.name.replace(oldName, newName);
          const newFilePath = path.join(directoryPath, newFileName);
          fs.rename(filePath, newFilePath, (err) => {
            if (err) {
              console.error('Error renaming file:', err);
            } else {
              console.log('Renamed:', filePath, 'to', newFilePath);
            }
          });
        }
      }
    });
  });
}

module.exports = { replaceFilesName };
