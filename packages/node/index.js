const { deleteFilesByExt } = require('./deleteFilesByExt');
const { getDir } = require('./getDir');
const { replaceFilesName } = require('./replaceFilesName');

const root = 'D:\\qrj\\download';
const deletesExt = ['.png', '.jpg'];
const dirs = getDir(root);

// replaceFilesName(root, '唐峰', '晓橙');
deleteFilesByExt(root, deletesExt);
