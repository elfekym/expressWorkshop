import { app } from './app';
import * as http from 'http';

const port = 8080;
const server = http.createServer(app);

server.listen(port);
server.on('error', (err) => {
 console.error(err);
});
server.on('listening', () => {
   console.info(`Listening on port ${port}`);
});