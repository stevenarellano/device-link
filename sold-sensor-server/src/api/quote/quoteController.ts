import express from 'express';
import { Inject } from 'typescript-ioc';

import { QuoteService } from './quoteService';

export class QuoteController {
	private quoteService: QuoteService;

	constructor(@Inject quoteService: QuoteService) {
		this.quoteService = quoteService;
	}

	public async postHandler(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		const { period, queries, limit } = req.body;
		const quote = await this.quoteService.feedback(period, queries, limit);
		res.send(quote);
	}
}

/*

SAMPLE QUERY:

{
    "period": [
        "2021-01-01T00:00:00.000Z",
        "2021-12-31T23:59:59.999Z"
    ],
    "queries": {
        "data_type": "humidity"
    },
    "limit": 20
}

*/
