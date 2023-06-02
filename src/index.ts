import express, {type Express} from 'express';
import multer from 'multer';
import {helloWorld, user, memberships, accountScripts, accountServices, getSubdomain, appListening} from './handlers';
import {port} from './constants';

const app: Express = express();

const upload = multer({dest: 'uploads/'});

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

