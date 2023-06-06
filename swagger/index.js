const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const mainRoutes = require('../src/router');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', mainRoutes);

app.listen(3000, () => {
  console.log('Server is listening on PORT 3000...');
});