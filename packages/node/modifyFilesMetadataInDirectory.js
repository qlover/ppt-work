const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const iconv = require('iconv-lite');

async function modifyFilesMetadataInDirectory(
  directoryPath,
  title,
  author,
  comments
) {
  try {
    // 读取目录中所有文件和子目录
    const entries = await fs.readdir(directoryPath, { withFileTypes: true });

    // 遍历每个文件和子目录
    for (const entry of entries) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) {
        // 如果是子目录，则递归调用该函数
        await modifyFilesMetadataInDirectory(
          entryPath,
          title,
          author,
          comments
        );
      } else {
        // 如果是文件，则修改元数据
        await modifyFileMetadata(entryPath, title, author, comments);
      }
    }
  } catch (error) {
    console.error('Error occurred while modifying files metadata:', error);
  }
}

// async function modifyFileMetadata(filePath, title, author, comments) {
//   try {
//     // 获取文件的当前元数据
//     const stats = await fs.stat(filePath);

//     // 更新文件的标题、作者和备注
//     const updatedStats = {
//       ...stats,
//       title: title || '',
//       author: author || '',
//       comments: comments || ''
//     };

//     // 写入更新的元数据
//     await fs.utimes(filePath, updatedStats.atime, updatedStats.mtime);
//     console.log(
//       `File metadata updated successfully for ${path.basename(filePath)}`
//     );
//   } catch (error) {
//     console.error('Error occurred while updating file metadata:', error);
//   }
// }


function modifyFileMetadata(filePath, title, author, comments) {
  // filePath = encodePath(filePath)
  const command = `exiftool -Title="${title}" -Author="${author}" -Comment="${comments}" ${filePath}`;
  exec(command, { encoding: 'buffer' }, (error, stdout, stderr) => {
    if (error) {
      console.error(
        `Error occurred while modifying file metadata: ${error.message}`
      );
      return;
    }
    if (stderr) {
      console.error(`ExifTool stderr: ${stderr}`);
      return;
    }
    console.log(`File metadata updated successfully for ${filePath}`);
  });
}

// 编码文件路径以避免 FileName encoding not specified 错误
function encodePath(filePath) {
  return iconv.encode(filePath, 'win1252').toString();
}

// // 示例用法
// const filePath = 'path/to/your/file.txt';
// const title = 'New Title';
// const author = 'John Doe';
// const comments = 'This is a modified file.';

// modifyFileMetadata(filePath, title, author, comments);

module.exports = {
  modifyFilesMetadataInDirectory,
  modifyFileMetadata,
  encodePath
};
