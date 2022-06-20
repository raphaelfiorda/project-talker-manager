const express = require('express');
const bodyParser = require('body-parser');
const { readContentFile, tokenGenerator } = require('./utils');
const { validateEmail, validatePassword } = require('./middlewares/loginValidator');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const readTalkersJSON = await readContentFile('./talker.json');

  if (!readTalkersJSON) return res.status(200).json({ message: [] });

  res.status(200).json(readTalkersJSON);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const readTalkersJSON = await readContentFile('./talker.json');

  const talkerById = readTalkersJSON.find((talker) => talker.id === Number(id));

  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talkerById);
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = tokenGenerator();

  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
