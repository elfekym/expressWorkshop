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