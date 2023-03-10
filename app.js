const express = require('express');
const products = require('./routers/products');
const salesRoute = require('./routers/sales');

const app = express();
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/products', products);
app.use('/sales', salesRoute);

app.use((err, _req, res, _next) => {
  const { code, message } = err;
  return res.status(code).json({ message });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;