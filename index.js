const express = require('express');
const bodyParser = require('body-parser');
const { readContentFile, writeNewTalker, editTalker, tokenGenerator } = require('./utils');
const { validateEmail, validatePassword } = require('./middlewares/loginValidator');
const { 
  validateToken, validateName, validateAge, validateTalk,
} = require('./middlewares/talkerPostValidator');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKER_JSON = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const readTalkersJSON = await readContentFile(TALKER_JSON);

  if (!readTalkersJSON) return res.status(200).json({ message: [] });

  res.status(200).json(readTalkersJSON);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const readTalkersJSON = readContentFile(TALKER_JSON);

  const talkerById = readTalkersJSON.find((talker) => talker.id === Number(id));

  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talkerById);
});

app.put('/talker/:id', validateToken, validateName, validateAge, validateTalk, (req, res) => {
  const { id } = req.params;
  editTalker(TALKER_JSON, req.body, id);
  const talkersList = readContentFile(TALKER_JSON);
  const editedTalker = talkersList[id - 1];
  return res.status(200).json(editedTalker);
});

app.post('/talker', validateToken, validateName, validateAge, validateTalk, (req, res) => {
  writeNewTalker(TALKER_JSON, req.body);
  const talkersList = readContentFile(TALKER_JSON);
  const newTalker = { ...req.body, id: talkersList.length };
  return res.status(201).json(newTalker);
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = tokenGenerator();
  
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
