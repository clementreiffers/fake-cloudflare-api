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

const readJsonAndSend = (jsonPath: string, res: Response) => 	{
	fs.readFile('src/memberships_response_1.json', (err: any, data: Buffer) => {
		if (err) {
			console.log(err);
		}

		res.send(JSON.parse(data.toString()));
	});
};

const memberships = (req: Request, res: Response) => {
	readJsonAndSend('src/memberships_response_1.json', res);
};

const accountServices = (req: Request, res: Response) => {
	readJsonAndSend('src/get_accounts_services.json', res);
};

const accountScripts = (req: Request, res: Response) => {
	readJsonAndSend('src/put_accounts_scripts.json', res);
};

const getSubdomain = (req: Request, res: Response) => {
	readJsonAndSend('get_subdomain.json', res);
};

const postScriptSubdomain = (req: Request, res: Response) => {
	res.send('done');
};

app.get('/', helloWorld);
app.get('/client/v4', user);
app.get('/client/v4/user', user);
app.get('/client/v4/memberships', memberships);
app.get('/client/v4/accounts/:accounts/workers/services/:services', accountServices);
app.get('/client/v4/accounts/:accounts/workers/subdomain', getSubdomain);
app.all('/', user);

app.post('/client/v4/accounts/:accounts/workers/scripts/:script/subdomain', accountScripts);

app.put('/client/v4/accounts/:accounts/workers/scripts/:script', accountScripts);

app.listen(port, appListening);
