import express, { Express } from 'express';
import dotenv from 'dotenv';
import { deviceRouter } from './api';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/api', deviceRouter);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});
