const fs = require('fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'your-text.txt');
const file = fs.createWriteStream(filePath);

const { stdout, stdin } = process;
stdout.write(
  'Well, hello! Write down everything what you want to add in .txt file.\n',
);

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  file.write(data);
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  stdout.write('\nChiao!\n');
});
