import express from 'express';
import routes from './routes'
import middlewares from './middlewares'
import APIError from './helpers/apiError'
// import {convertErrors} from './middlewares/errorHandeling'

const app = express();

app.use(middlewares())

app.use((req, res, next) => {
  const current_user = req.get('X-CURRENT-USER')
  if(current_user === undefined && req.path != '/api/register') {
    return next(new APIError(401, "Tough luck buddy"));
  }
  req.current_user = current_user
  next()
})

app.use('/api', routes);

export default app;
