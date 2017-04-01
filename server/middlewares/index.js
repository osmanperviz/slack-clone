import { compose } from 'compose-middleware'
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import { convertErrors, handleNotFound } from './errorHandeling'

export default function() {
  return compose([
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    cors(),
    // convertErrors(err, req, res, next),
  ])
}
