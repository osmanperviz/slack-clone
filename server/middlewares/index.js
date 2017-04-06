import { compose } from 'compose-middleware'
import logger from 'morgan';
import bodyParser from 'body-parser';
import { convertErrors, handleNotFound } from './errorHandeling'

export default function() {
  return compose([
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
  ])
}
