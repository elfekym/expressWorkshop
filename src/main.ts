import { app } from './app';
import * as http from 'http';
import * as mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/item';
const port = 8080;
const server = http.createServer(app);

server.listen(port);
server.on('error', (err) => {
 console.error(err);
});
server.on('listening', async () => {
   console.info(`Listening on port ${port}`);
   mongoose.connect(MONGO_URI, 
       { 
           useNewUrlParser: true,
           useFindAndModify: false
       });
   mongoose.connection.once('open', () => {
       console.info('Connected to Mongo via Mongoose');
   });
   mongoose.connection.on('error', (err) => {
       console.error('Unable to connect to Mongo via Mongoose', err);
   });
});