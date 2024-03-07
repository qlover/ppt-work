const fs = require('fs');
const { join } = require('path');

const directoryPath = 'D:\\qrj\\download\\3.1';
function getAllDirectories(path) {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => join(directoryPath, dirent.name));
}

const directories = getAllDirectories(directoryPath);

console.log(directories);
