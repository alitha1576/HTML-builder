const path = require('node:path');
const fs = require('fs');
const { mkdir, rm, copyFile, readdir } = fs.promises;

const filesFolder = path.join(__dirname, 'files');
const filesCopyFolder = path.join(__dirname, 'files-copy');

async function makeDirectory() {
  const promise = new Promise((resolve) => {
    fs.stat(filesCopyFolder, async (error, stats) => {
      if (stats && stats.isDirectory()) {
        await rm(filesCopyFolder, { recursive: true });
      }
      await mkdir(filesCopyFolder, { recursive: true });
      resolve();
    });
  });
  const res = await promise;
  return res;
}

async function copyFiles() {
  try {
    const files = await readdir(filesFolder);
    for (const file of files) {
      const sourceFile = path.join(filesFolder, file);
      const destinationFile = path.join(filesCopyFolder, file);
      await copyFile(sourceFile, destinationFile);
    }
  } catch (error) {
    console.error('Error during folder copy:', error.message);
  }
}

async function start() {
  await makeDirectory();
  await copyFiles();
}

start();
