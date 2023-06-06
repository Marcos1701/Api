import cors from 'cors';

import express, { Application, Request, Response } from 'express';
import router from './router.js';
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

export const app: Application = express();
app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));

app.use(express.json())
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(router);


app.use(function (req: Request, res: Response, next: Function) {
    res.status(404).send('Sorry cant find that!');
});
