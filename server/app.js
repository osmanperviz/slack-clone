import express from 'express';
import routes from './routes'
import middlewares from './middlewares'
import APIError from './helpers/apiError'

const app = express();

app.use(middlewares())

app.use('/api', routes);

export default app;
