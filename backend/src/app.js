const express = require('express');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

// Rota get '/products' que retorna todos os produtos da tabela products

// Rota get '/products/:id' que retorna apenas o produto com o id passado na rota

module.exports = app;
