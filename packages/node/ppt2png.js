const officegen = require('officegen');
const fs = require('fs');
const sharp = require('sharp');

const inputPPTX = 'D:\\qrj\\ppt\\莫兰迪-唐峰素材 (1).pptx';
const outputImg = 'D:\\qrj\\ppt\\莫兰迪-唐峰素材 (1).png';

async function main() {
  // Create a new PPTX document
  const pptx = officegen('pptx');

  // Add slides to the document
  for (let i = 0; i < 3; i++) {
    const slide = pptx.makeNewSlide();
    // Add content to the slide (e.g., text, shapes, images, etc.)
  }

  // Generate the PPTX file
  const pptxBuffer = await pptx.generateAsync({ type: 'buffer' });

  // Write the PPTX file to disk
  fs.writeFileSync('output.pptx', pptxBuffer);

  // Convert each slide to an image
  const slides = await officegen.getSlides('output.pptx');
  const imageBuffers = await Promise.all(
    slides.map(async (slide, index) => {
      const imageBuffer = await slide.toBuffer();
      fs.writeFileSync(`slide_${index}.jpg`, imageBuffer);
      return imageBuffer;
    })
  );

  // Combine the images into a single image
  const combinedImageBuffer = await sharp({
    create: {
      width: 1000, // Width of the combined image
      height: 1000, // Height of the combined image
      channels: 3, // Number of color channels (3 for RGB)
      background: { r: 0, g: 0, b: 0, alpha: 0 } // Background color (black with 0% opacity)
    }
  })
    .composite(
      imageBuffers.map((buffer, index) => ({
        input: buffer,
        top: index * 100, // Adjust the top position of each image
        left: 0 // All images will be aligned to the left
      }))
    )
    .toBuffer();

  // Write the combined image to disk
  fs.writeFileSync('combined_image.jpg', combinedImageBuffer);
}

main();

// const pres = new pptx.Presentation({
//   sourceFile: inputPPTX
// });

// pres
//   .loadSlides()
//   .then(() => {
//     const { slides } = pres;
//     const slidePreviews = [];

//     for (const slide of slides) {
//       const preview = slide.getThumbnail();
//       slidePreviews.push(preview);
//     }

//     // 将所有页的预览图合成一张图片
//     const finalPreview = new pptx.Image();

//     finalPreview.create({
//       width: 1920,
//       height: 1080,
//       layout: 'landscape',
//       slides: slidePreviews
//     });

//     // 保存合成的预览图
//     finalPreview.write(outputImg, (err) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log('Preview image saved successfully!');
//       }
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });
// const pptx = require('pptxgenjs');
// const Jimp = require('jimp');
// const pptxFile = new pptx();

// pptxFile.load({ path: 'your_ppt.pptx', masterSlide: { name: 'default' } });

// pptxFile.config.media = {
//   dataOrPath: 'base64', // 'data' (default) OR 'path'
//   path: 'your_output_image.png', // if 'path' then save image to this file path
//   quality: 90 // default 90
// };

// pptxFile.writeFile();

// async function genImage() {
//   const imagePaths = ['image1.png', 'image2.png', 'image3.png'];

//   const images = await Promise.all(imagePaths.map((path) => Jimp.read(path)));

//   const width = images.reduce((acc, image) => acc + image.bitmap.width, 0);
//   const height = Math.max(...images.map((image) => image.bitmap.height));

//   const concatImage = new Jimp(width, height);

//   let x = 0;
//   await Promise.all(
//     images.map(async (image) => {
//       concatImage.composite(image, x, 0);
//       x += image.bitmap.width;
//     })
//   );

//   concatImage.write('concatenated_image.png');
// }
// const fs = require('fs');
// const pptx = require('node-pptx');

// // 读取 ppt 文件
// const presentation = fs.readFile('D:\\qrj\\ppt\\莫兰迪-唐峰素材 (1).pptx');

// // 创建一个新的 pptx 文件用于预览图
// const preview = pptx.create();

// // 遍历每一页，并将其添加到预览图中
// presentation.getSlides().forEach((slide) => {
//   preview.addSlide(slide);
// });

// // 保存预览图
// preview.writeFile('D:\\qrj\\ppt\\莫兰迪-唐峰素材 (1).png');
