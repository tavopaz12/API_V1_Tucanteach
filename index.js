const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.hanlder');
const path = require('path');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());
app.use('/public', express.static(`${__dirname}/storage/imgs`));
app.use('/public', express.static(`${__dirname}/storage/avatar`));
app.use('/public', express.static(`${__dirname}/storage/files`));
app.use('/public/avatar', express.static(`${__dirname}/storage/Svg-Avatar`));
app.use('/public/icon', express.static(`${__dirname}/storage/Svg-Icons`));

app.use(cors());

require('./utils/auth/index');

app.get('/', (req, res) => {
  res.redirect('https://tucanteach.ml/');
});

app.get('/tavo', (req, res) => {
  let rutaIndex = path.join(__dirname, './views/index.html');
  res.sendFile(rutaIndex);
});

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port' + port);
});
