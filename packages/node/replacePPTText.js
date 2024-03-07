const pptxgen = require("pptxgenjs");
const fs = require('fs');

// // 创建一个新的PPT文件
// const ppt = new pptxgen();

// 加载现有的PPT文件
// ppt.load("D:\\qrj\\download\\2.29\\01 详情展示\\毕业答辩- (2).pptx");

fs.readFile("D:\\qrj\\download\\2.29\\01 详情展示\\毕业答辩- (2).pptx", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const newData = data.replace(/唐峰/g, '晓橙');

    fs.writeFile('updated_presentation.ppt', newData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('替换完成！');
    });
});
// 保存修改后的PPT文件
// ppt.save("D:\\qrj\\download\\2.29\\01 详情展示\\毕业答辩- (2).pptx");
