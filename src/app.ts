import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';
import { requestLoggerMiddleware } from './request.logger.middleware';
import { itemRoutes } from './item.controller';

const app = express();
app.use(cors());
app.use(bodyparser.json());

// TODO - Add more middleware
app.use(requestLoggerMiddleware);
app.use(itemRoutes);

export { app }