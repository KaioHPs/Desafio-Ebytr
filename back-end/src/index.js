const express = require('express');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT || '3000';

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
