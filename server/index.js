import mongoose from 'mongoose';
import app from './app';
import util from 'util';
import seed from './db/seed'

const debug = require('debug')('slack-clone');


var Promise = require("bluebird");
mongoose.Promise = Promise;

const mongoUri = 'mongodb://localhost:27017/slack-clone';
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error('unable to connect to database: slack-clone');
});

mongoose.set('debug', (collectionName, method, query, doc) => {
  debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
 });

const { PORT = 4000 } = process.env;

seed() //add default room on start

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

/**
 * Create Socket.IO instance.
 */
require('../socket.io')(server);
