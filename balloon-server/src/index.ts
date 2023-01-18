import express, { Express } from 'express';
import dotenv from 'dotenv';
import { deviceRouter, quoteRouter } from './api';

var cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// MIDDLE WARE
app.use(cors());
app.use(bodyParser.json());

app.use('/api', deviceRouter);
app.use('/api', quoteRouter);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});
