import { Collection } from 'mongodb';
import { mongoURI } from '../constants';

export const getCollection = (db: string, collection: string): Collection => {
	const { MongoClient, ServerApiVersion } = require('mongodb');
	const uri = mongoURI;
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	});
	return client.db(db).collection(collection);
};
