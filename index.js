const express = require('express');
const bodyParser = require('body-parser');
const { readContentFile } = require('./utils');

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

app.listen(PORT, () => {
  console.log('Online');
});
