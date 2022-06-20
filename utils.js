const fs = require('fs/promises');

const readContentFile = async (path) => {
  const readedFile = await fs.readFile(path, 'utf8');

  return JSON.parse(readedFile);
};

module.exports = { readContentFile };