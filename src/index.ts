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
