const fs = require('fs');
const path = require('path');

/**
 * 删除指定目录下所有 exts 扩展的文件
 *
 * @param {string} directoryPath
 * @param {string[]} exts
 */
function deleteFilesByExt(directoryPath, exts) {
  // 读取目录下的所有文件和目录
  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // 遍历所有文件和目录
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file.name);

      // 如果是目录，则递归删除该目录下的所有 .png 文件
      if (file.isDirectory()) {
        deleteFilesByExt(filePath, exts);
      } else {
        const ext = path.extname(file.name).toLowerCase();
        if (exts.includes(ext)) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log('Deleted:', filePath);
            }
          });
        }
      }
    });
  });
}

module.exports = { deleteFilesByExt };
