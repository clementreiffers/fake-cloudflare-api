import {type Request, type Response} from 'express';
import {port} from './constants';
import {accountScript, accountServices, membership, subdomain} from './defaultResponses';

const handleHelloWorld = (req: Request, res: Response): void => {
	res.send('hello world');
};

const handleAppListening = (): void => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
};

const handleMemberships = (req: Request, res: Response): void => {
	res.send(membership);
};

const handleAccountsServices = (req: Request, res: Response): void => {
	res.send(accountServices);
};

const handleAccountsScripts = (req: Request, res: Response): void => {
	res.send(accountScript);
};

const handleSubdomain = (req: Request, res: Response): void => {
	res.send(subdomain);
};

const handleUser = (req: Request, res: Response): void => {
	// Console.log('req', req);
	// Console.log('res', res);
	res.send('done');
};

export {
	handleHelloWorld,
	handleAccountsScripts,
	handleAccountsServices,
	handleSubdomain,
	handleMemberships,
	handleUser,
	handleAppListening,
};

