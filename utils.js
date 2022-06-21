const fs = require('fs');
const randomToken = require('random-token');

const readContentFile = (path) => {
  const readedFile = fs.readFileSync(path, 'utf8');

  return JSON.parse(readedFile);
};

const writeNewTalker = (path, content) => {
  try {
    const talkerFile = readContentFile(path);
    const updatedFile = talkerFile.concat({ ...content, id: talkerFile.length + 1 });
    fs.writeFileSync(path, JSON.stringify(updatedFile));
  } catch (err) {
    console.log(err.message);
  }
};

const editTalker = (path, content, id) => {
  try {
    const talkerFile = readContentFile(path);
    talkerFile[id - 1] = { ...content, id: Number(id) };
    fs.writeFileSync(path, JSON.stringify(talkerFile));
  } catch (err) {
    console.log(err.message);
  }
};

const deleteTalker = (path, id) => {
  try {
    const talkerFile = readContentFile(path);
    const updatedFile = talkerFile.filter((talker) => talker.id !== Number(id));
    console.log(updatedFile);
    fs.writeFileSync(path, JSON.stringify(updatedFile));
  } catch (err) {
    console.log(err.message);
  }
};

const tokenGenerator = () => {
  const token = randomToken(16);
  return token;
};

module.exports = { readContentFile, writeNewTalker, editTalker, deleteTalker, tokenGenerator };