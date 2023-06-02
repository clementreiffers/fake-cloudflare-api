import express, {type Express, type NextFunction, type Request, type Response} from 'express';
import fs from 'fs';
import multer from 'multer';

const app: Express = express();
const port = 3000;

const helloWorld = (req: Request, res: Response) => res.send('hello world');
const appListening = () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
};

const upload = multer({dest: 'uploads/'});

const user = (req: Request, res: Response) => {
	// Console.log('req', req);
	// Console.log('res', res);
	res.send('done');
};

const readJsonAndSend = (jsonPath: string, res: Response) => 	{
	fs.readFile(jsonPath, (err: any, data: Buffer) => {
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
	console.log('accountServices:', req.params);
	readJsonAndSend('src/get_accounts_services.json', res);
};

const accountScripts = (req: Request, res: Response) => {
	console.log('accountScripts', req.params);
	console.log('body', req.file);
	readJsonAndSend('src/get_accounts_services.json', res);
};

const getSubdomain = (req: Request, res: Response) => {
	readJsonAndSend('src/get_subdomain.json', res);
	console.log('subdomain', req.params);
};

app
	// GET
	.get('/', helloWorld)
	.get('/client/v4', user)
	.get('/client/v4/user', user)
	.get('/client/v4/memberships', memberships)
	.get('/client/v4/accounts/:accounts/workers/subdomain', getSubdomain)
	.get('/client/v4/accounts/:accounts/workers/services/:services', accountServices)
	// POST
	.post('/client/v4/accounts/:accounts/workers/scripts/:script/subdomain', accountScripts)
	// PUT
	.put('/client/v4/accounts/:accounts/workers/scripts/:scripts', upload.array('index.js'), accountScripts)

	.all('/', user)
	.use((err: any, req: any, res: any, next: any) => {
		console.log('This is the invalid field ->', err.field);
		console.log('error:', err);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		next(err);
	})
	.use(upload.array('file'))
	.listen(port, appListening);

