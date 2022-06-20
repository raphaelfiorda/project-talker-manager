const fs = require('fs/promises');
const randomToken = require('random-token');

const readContentFile = async (path) => {
  const readedFile = await fs.readFile(path, 'utf8');

  return JSON.parse(readedFile);
};

const tokenGenerator = () => {
  const token = randomToken(16);
  return token;
};

module.exports = { readContentFile, tokenGenerator };