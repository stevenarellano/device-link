import { Collection } from 'mongodb';
import { mongoURI } from '../../constants';
import { getCollection } from '../../utils';

function estimateCost(documentCount: number, queryCount: number) {
	/*
		WHEN PARAMETERS GO UP, THE COST WILL INCREASE (better data);
		CURRENT PRICING: 1 SOL PER 10,000 Data Points
	*/
	const complexityFactor = 0.0001 * 1.1 ** queryCount;
	const transactionFee = documentCount * 0.001; // PER 1000, WE EXPECT TO MAKE 1 SOL

	return complexityFactor * documentCount + transactionFee;
}

async function getQuote(dates: string[], queries: any, limit: number) {
	const deviceData: Collection = getCollection('DeviceDate', 'all');

	const countQuery = {
		date_added: { $gte: new Date(dates[0]), $lte: new Date(dates[1]) },
		...queries,
	};

	const count = Math.min(await deviceData.countDocuments(countQuery), limit);

	const numQueries = Object.keys(queries).length;
	const quote = estimateCost(count, numQueries);

	const response: QuoteResponse = {
		quote,
		data_count: count,
	};

	return response;
}

type QuoteResponse = {
	quote: number;
	data_count: number;
};

export class QuoteService {
	public async feedback(
		period: string[],
		queries: any,
		limit: number
	): Promise<QuoteResponse> {
		return await getQuote(period, queries, limit);
	}
}
