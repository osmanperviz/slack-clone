import express from 'express';
import routes from './routes'
import middlewares from './middlewares'
// import {convertErrors} from './middlewares/errorHandeling'

const app = express();

app.use(middlewares())
app.use('/api', routes);

export default app;
