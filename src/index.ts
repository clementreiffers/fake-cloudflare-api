import express, {type Express, type Request, type Response} from 'express';
import fs from 'fs';

const app: Express = express();
const port = 3000;

const helloWorld = (req: Request, res: Response) => res.send('hello world');
const appListening = () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
};

const user = (req: Request, res: Response) => {
	// Console.log('req', req);
	// Console.log('res', res);
	res.send('done');
};

const memberships = (req: Request, res: Response) => {
	fs.readFile('src/memberships_response_1.json', (err: any, data: Buffer) => {
		if (err) {
			console.log(err);
		}

		const header = {
			'content-type': 'application/json',
			date: 'Thu, 01 Jun 2023 16:45:41 GMT',
			'transfer-encoding': 'chunked',
			connection: 'close',
			'cf-ray': '7d08eda65daf23cb-LHR',
			'cf-cache-status': 'DYNAMIC',
			'cache-control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
			'content-encoding': 'gzip',
			expires: 'Sun, 25 Jan 1981 05:00:00 GMT',
			'set-cookie': '__cflb=0H28vgHxwvgAQtjUGU56Rb8iNWZVUvXhpxTnU4gLUku; SameSite=Lax; path=/; expires=Thu, 01-Jun-23 19:15:42 GMT; HttpOnly,__cfruid=58d4c37a332fb20b9aa59bdcabe6e3b0086bf95f-1685637941; path=/; domain=.api.cloudflare.com; HttpOnly; Secure; SameSite=None',
			'strict-transport-security': 'max-age=31536000',
			pragma: 'no-cache',
			'x-content-type-options': 'nosniff',
			'x-frame-options': 'SAMEORIGIN',
			vary: 'Accept-Encoding',
			server: 'cloudflare',
		};

		res.send(JSON.parse(data.toString()));
	});
};

app.get('/', helloWorld);
app.get('/client/v4', user);
app.get('/client/v4/user', user);
app.get('/client/v4/memberships', memberships);
app.get('/client/v4/accounts/:accounts/workers/services/:services', helloWorld);
app.all('/', user);

app.put('/client/v4/accounts/:accounts/workers/scripts', helloWorld);

app.listen(port, appListening);
