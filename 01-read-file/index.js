const fs = require('fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath);

readStream.on('data', function (chunk) {
  console.log(chunk.toString());
});

// readStream.on('end', () => {
//   readStream.close();
// });
