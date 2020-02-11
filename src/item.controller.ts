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