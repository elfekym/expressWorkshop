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