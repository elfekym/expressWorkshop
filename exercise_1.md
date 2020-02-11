First Create a new folder and through the terminal run

`npm init`
Enter values that you like, then OK

Once done, we will add some dependencies, through the terminal run

`npm install --save express ts-node typescript cors body-parser`
`npm install --save-dev @types/express @types/node nodemon`

Create a new Folder called `src` at the root folder.
Inside that folder create a new file called `app.ts` inside this file we will define our express server and all of our endpoints and middlewares.

Copy this code to `app.ts`

 ```
 import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyparser.json());

// TODO - Add more middleware

export { app }
 ```

 Here we just constructed an express server with CORS support, and another middleware that converts all HTTP body data to json, all routes to be defined later.

 Create a new file `main.ts` in the `src` folder and add the following to it

 ```
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
 ```

 This will start our server at port `8080` printing log text indicating that it started or failed on that, since so, add this line to `package.json` at the root directory of your folder, in scripts section

 `"start": "nodemon -x ts-node src/main.ts"`

 Try to run the server now through the terminal, run `npm start`.

 Nothing much, just a log to indicate a good start. Now we can add another Middleware that logs every request to our routes, in `src` folder create a new file called `request.logger.middleware.ts` with the following 

 ```
 import * as express from 'express';
 
const requestLoggerMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.info(`${req.method} ${req.originalUrl}`);
 
	const start = new Date().getTime();
	res.on('finish', () => {
		const elapsed = new Date().getTime() - start;
		const msg = `${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`;
		console.info(msg);
	});
	next();
}
 
export { requestLoggerMiddleware };
```
Now add this middleware to our `app.ts` as follows 
near the top imports add 
`import { requestLoggerMiddleware } from './request.logger.middleware';`

and this line before the export to inject this middleware
`app.use(requestLoggerMiddleware);`
If you save the file, server will notice the changes and restart as well.

Last thing in this exercise is to define the endpoints that we actually need, just an empty shell for them with no actual logic.

In `src` folder create a new file called `item.controller.ts` with the following logic in it 

```
import * as express from 'express';

const itemRoutes = express.Router();
itemRoutes.get('/item', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.log("getting Items");
	resp.end();
});

itemRoutes.post('/item', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.log("saving item");
	resp.end();
});

itemRoutes.put('/item/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.log("Editing Item");
	resp.end();
});

itemRoutes.delete('/item/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.log("deleting item");
	resp.end();
});

itemRoutes.get('/item/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.log("getting item");
	resp.end();
});

export { itemRoutes }
```

then now we can getback to `app.ts` and do same thing we did to our logger
after all imports we add 
`import { itemRoutes } from './item.controller';`
and before the export we add 
`app.use(itemRoutes);`

Now run, and explore your endpoints and check the logs.