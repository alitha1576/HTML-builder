const fs = require('fs');
const path = require('node:path');

const folderPath = path.join(__dirname, 'secret-folder');
const { stdout } = process;

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      const filePath = path.join(file.parentPath, file.name);
      fs.stat(filePath, (error, stats) => {
        if (stats.isDirectory()) {
          return;
        }
        const fileParsed = path.parse(filePath);
        stdout.write(
          `${fileParsed.name} - ${fileParsed.ext.slice(1)} - ${stats.size} bytes \n`,
        );
      });
    });
  }
});
