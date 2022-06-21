const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  const isTokenInvalid = authorization.length !== 16 || typeof authorization !== 'string';

  if (isTokenInvalid) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

  const isNameInvalid = name.length < 3;

  if (isNameInvalid) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

  const isAgeInvalid = age < 18;

  if (isAgeInvalid) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

function validateWatchedAndRate(date, rate, res) {
  const validDateFormat = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!date.match(validDateFormat)) {
  return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  const isRateInvalid = rate < 1 || rate > 5 || !Number.isInteger(rate);
  if (isRateInvalid) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
}

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  const { watchedAt, rate } = talk;

  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });

  if (!rate && rate !== 0) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });

  validateWatchedAndRate(watchedAt, rate, res);

  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
};
