import express, {type Express} from 'express';
import multer from 'multer';
import {handleHelloWorld, handleUser, handleMemberships, handleAccountsScripts, handleAccountsServices, handleSubdomain, appListening} from './handlers';
import {port} from './constants';

const app: Express = express();

const upload = multer({dest: 'uploads/'});

app
	// GET
	.get('/', handleHelloWorld)
	.get('/client/v4', handleUser)
	.get('/client/v4/user', handleUser)
	.get('/client/v4/memberships', handleMemberships)
	.get('/client/v4/accounts/:accounts/workers/subdomain', handleSubdomain)
	.get('/client/v4/accounts/:accounts/workers/services/:services', handleAccountsServices)
	// POST
	.post('/client/v4/accounts/:accounts/workers/scripts/:script/subdomain', handleAccountsScripts)
	// PUT
	.put('/client/v4/accounts/:accounts/workers/scripts/:scripts', upload.array('index.js'), handleAccountsScripts)

	.all('/', handleUser)
	.use((err: any, req: any, res: any, next: any) => {
		console.log('This is the invalid field ->', err.field);
		console.log('error:', err);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		next(err);
	})
	.use(upload.array('file'))
	.listen(port, appListening);

