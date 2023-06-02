import {type Request, type Response} from 'express';
import fs from 'fs';
import {getAccountServicesJson, getSubdomainJson, membershipJson, port} from './constants';
const readJsonAndSend = (jsonPath: string, res: Response) => 	{
	fs.readFile(jsonPath, (err: any, data: Buffer) => {
		if (err) {
			console.log(err);
		}

		res.send(JSON.parse(data.toString()));
	});
};

const handleHelloWorld = (req: Request, res: Response) => res.send('hello world');
const appListening = () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
};

const handleMemberships = (req: Request, res: Response) => {
	readJsonAndSend(membershipJson, res);
};

const handleAccountsServices = (req: Request, res: Response) => {
	console.log('accountServices:', req.params);
	readJsonAndSend(getAccountServicesJson, res);
};

const handleAccountsScripts = (req: Request, res: Response) => {
	console.log('accountScripts', req.params);
	console.log('body', req.file);
	readJsonAndSend(getAccountServicesJson, res);
};

const handleSubdomain = (req: Request, res: Response) => {
	readJsonAndSend(getSubdomainJson, res);
	console.log('subdomain', req.params);
};

const handleUser = (req: Request, res: Response) => {
	// Console.log('req', req);
	// Console.log('res', res);
	res.send('done');
};

export {handleHelloWorld,
	handleAccountsScripts,
	handleAccountsServices,
	handleSubdomain,
	handleMemberships,
	handleUser,
	appListening};

