const { deleteFilesByExt } = require('./deleteFilesByExt');
const { getDir } = require('./getDir');
const {
  modifyFilesMetadataInDirectory, modifyFileMetadata
} = require('./modifyFilesMetadataInDirectory');
const { replaceFilesName } = require('./replaceFilesName');

// const root = 'D:\\qrj\\download';
// const deletesExt = ['.png', '.jpg'];
// const dirs = getDir(root);

// // replaceFilesName(root, '唐峰', '晓橙');
// deleteFilesByExt(root, deletesExt);

// 示例用法
const directoryPath = 'D:\\qrj\\download\\2.29\\01 详情展示';
const title = '晓橙';
const author = '晓橙';
const comments = '晓橙';

// modifyFilesMetadataInDirectory(directoryPath, title, author, comments);
modifyFileMetadata('D:\\qrj\\download\\2.29\\test.pptx', title, author, comments);
