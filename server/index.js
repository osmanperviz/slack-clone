import app from './app';

const debug = require('debug')('slack-clone:index');


const { PORT = 4000 } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
