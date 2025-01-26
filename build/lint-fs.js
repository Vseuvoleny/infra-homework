import fs from 'node:fs/promises';
import path from 'node:path';

async function lint() {
  const pathToFiles = path.resolve(import.meta.dirname, '../src/components');
  const arrOfError = [];
  const folders = await fs.readdir(path.resolve(pathToFiles));
  for (const folder of folders) {
    const result = await fs.readdir(path.resolve(`${pathToFiles}/${folder}`));
    const indexFileName = 'index.js';
    const folderName = `${folder}.js`;
    if (!result.includes(indexFileName)) {
      arrOfError.push(
        `Structure of component ${folder} is broken! Missing ${indexFileName}`,
      );
    }
    if (!result.includes(`${folder}.js`)) {
      arrOfError.push(
        `Structure of component ${folder} is broken! Missing ${folderName}`,
      );
    }
  }
  if (arrOfError.length === 0) {
    console.log('File structure if right');
  } else {
    arrOfError.forEach((e) => {
      console.log(e);
    });
  }
}

lint();
