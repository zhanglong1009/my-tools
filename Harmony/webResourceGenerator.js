const fs = require('fs');
const path = require('path');

// 代码根据那个文件夹下的目录执行脚本
const FileName = "dist"


function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  console.log(files)
  const webResourceList = [];
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // 如果是文件夹，则递归遍历
      const subList = traverseDirectory(filePath);
      webResourceList.push(...subList);
    } else {
      // 如果是文件，则处理路径并根据文件类型设置 mimeType
      let mimeType = '';
      if (filePath.endsWith('.html')) {
        mimeType = 'text/html';
      } else if (filePath.endsWith('.css')) {
        mimeType = 'text/css';
      } else if (filePath.endsWith('.md')) {
        mimeType = 'text/markdown';
      } else if (filePath.endsWith('.js')) {
        mimeType = 'application/javascript';
      } else if (filePath.endsWith('.svg')) {
        mimeType = 'image/svg+xml';
      } else if (filePath.endsWith('.png')) {
        mimeType = 'image/png';
      } else if (filePath.endsWith('.jpg')) {
        mimeType = 'image/jpeg';
      } else if (filePath.endsWith('.jpeg')) {
        mimeType = 'image/jpeg';
      } else if (filePath.endsWith('.ico')) {
        mimeType = 'image/x-ico';
      } else if (filePath.endsWith('.map')) {
        mimeType = 'application/js';
      } else if (filePath.endsWith('.json')) {
        mimeType = 'application/json';
      } else if (filePath.endsWith('.png')) {
        mimeType = 'image/png';
      } else if (filePath.endsWith('.bin')) {
        mimeType = 'application/octet-stream';
      } else if (filePath.endsWith('.wasm')) {
        mimeType = 'application/wasm';
      } else if (filePath.endsWith('.webp')) {
        mimeType = 'image/webp';
      } else if (filePath.endsWith('.gif')) {
        mimeType = 'image/gif';
      } else if (filePath.endsWith('.txt')) {
        mimeType = 'text/plain';
      }


      // 添加到 webResourceList
      webResourceList.push({
        path: filePath.replace(/\\/g, '/').replaceAll(FileName + '/', ''), // 将 \ 替换为 /,并将dist前缀去掉
        mimeType: mimeType,
      });
    }
  }

  return webResourceList;
}
// 指定目标文件夹的路径
const targetDirectory = './' + FileName;

// 生成 TypeScript 代码
const tsCode = `
export interface WebResource {
  path: string;
  mimeType: "text/html" | "text/css" | "text/markdown" | "text/plain"  |"application/javascript" | "application/js" | "image/svg+xml" | "image/png" | "image/x-ico" | "image/jpeg"| "image/webp"| "image/gif" | "application/json" | "application/octet-stream" | "application/wasm";
}

export const webResourceList: WebResource[] = ${JSON.stringify(traverseDirectory(targetDirectory), null, 2)};

`;

// 将 TypeScript 代码写入 .ts 文件
fs.writeFileSync('./' + FileName + '/webResource.ts', tsCode);

// 打印结果
console.log('webResource.ts 文件已生成');
