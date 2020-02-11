import * as express from 'express';
import { ItemModel } from './item';

const itemRoutes = express.Router();
itemRoutes.get('/item', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	try {
		let items: any = await ItemModel.find({});
		resp.json(items);
	} catch (err) {
		resp.status(500);
		resp.end();
		console.error('Caught error', err);
	}
 });
 
 itemRoutes.post('/item', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const itemJson = req.body;
	const item = new ItemModel(itemJson);
	await item.save();
	resp.end();
 });
 
 itemRoutes.put('/item/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const id = req.params['id'];
	let item;
	try {
		item = await ItemModel.findById(id);
		if(item.status == null){
			item.status = "SOLD";
			await ItemModel.findOneAndUpdate({
				_id: id
			}, item, { upsert: true });
			resp.status(200);
		}else{
			resp.status(409);
		}
	} catch (error) {
		console.error(error);
		resp.status(500);
	}
	resp.end();
 });
 
 itemRoutes.delete('/item/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const id = req.params['id'];
	await ItemModel.findByIdAndRemove(id);
	resp.end();
 });
 
 itemRoutes.get('/item/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const id = req.params['id'];
	let item;
	try {
		item =await ItemModel.findById(id);
		resp.json(item);
	} catch (error) {
		resp.status(404);
	}
	resp.end();
 });

export { itemRoutes }