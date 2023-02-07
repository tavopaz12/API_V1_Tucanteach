const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.hanlder');

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

const whitelist = [
  'http://localhost:8080',
  'https://tucanteach.ml/',
  'https://main--tucanteach.netlify.app/',
  'http://127.0.0.1:5500',
  'http://localhost:3000/',
  'http://127.0.0.1:5501',
  'https://tavopaz12.github.io/lista-pendientes/',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
};
app.use(cors());

require('./utils/auth/index');

app.get('/', (req, res) => {
  res.send('<h1>API TUCANTEACH</h1>');
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
