const fs = require('fs');
const path = require('node:path');

const folderPath = path.join(__dirname, 'styles');
const dataArray = {
  data: [],
};

const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const bundleFile = fs.createWriteStream(bundlePath);

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    fs.stat(filePath, async (err, stats) => {
      if (err) {
        console.log(err);
        return;
      }
      if (stats.isFile()) {
        if (path.extname(file) == '.css') {
          const cssFile = file;
          const pathCssFile = path.join(folderPath, cssFile);
          const promise = new Promise((resolve) => {
            fs.readFile(pathCssFile, 'utf8', (err, data) => {
              if (err) {
                console.error(err);
                return;
              }
              dataArray.data.push(data);
              bundleFile.write(data);
              resolve();
            });
          });
          await promise;
        }
      }
    });
  });
});
