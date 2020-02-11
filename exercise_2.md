Now we start adding Mongoose and Mongo Schema for our Item, so we can save it in Mongo DB

We will first add those dependencies, as usual, through Terminal execute the following commands

```
npm install --save mongoose
npm install --save-dev @types/mongoose
```

Now we will create our Item Model, in `src` folder create a new file `item.ts` with the following code 

```
import * as mongoose from "mongoose";
 
const ItemSchema = new mongoose.Schema({
    description: String,
    price: Number,
    type: String,
    id: String,
    status: String
});
 
const ItemModel = mongoose.model('Item', ItemSchema);
 
export { ItemModel }
```
Next we will be adding this schema to our controller, so we can use it in getting, editing and deleting our items, through each route.
At `item.controller.ts`, Add this import after all imports 
`import { ItemModel } from './item';`

then we can  update our routes controller to be like the following 
 ```

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

 ```

Then in `main.ts` we will add the following to create a connection between our application and the running mongo instance.
at the top add the following 
`import * as mongoose from 'mongoose';`
Then define this const after all the imports 

If you will run using docker compose 
`const MONGO_URI = 'mongodb://'+ process.env.MONGO_HOSTNAME+':'+process.env.MONGO_PORT +'/item';`

If you will run using docker, or locally installed mongo 
`const MONGO_URI = 'mongodb://localhost:27017/item';`

then we will change `server.on` to be as follows
```
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
```

Assuming you have docker installed , please run the following command to run mongo instance
`docker run -d -p 27017-27019:27017-27019 --name mongodb mongo`
now save all your open files and try to run your application, use postman to test your endpoints.
This should be a good input for saving an Item
```
{
	"description": "workshop__DONE",
	"price": 999,
	"type": "Alten"
}
```

If you want to use docker while running and docker compose to orchistrate MongoDB,  RabbitMQ and your app instanse please move to next exercise