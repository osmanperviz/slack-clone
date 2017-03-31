import app from './app';
import mongoose from 'mongoose';

const debug = require('debug')('slack-clone:index');

const mongoUri = 'mongodb://localhost:27017/slack-clone';
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error('unable to connect to database: slack-clone');
});

mongoose.set('debug', (collectionName, method, query, doc) => {
   debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
 });

const { PORT = 4000 } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
