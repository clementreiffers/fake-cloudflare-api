import express, {type Express} from 'express';
import {port} from './constants';
import routes, {setRoutes} from './routes';
import {appListening} from './handlers';
import {upload} from './upload';

const app: Express = setRoutes(express(), routes);
app.use(upload.array('files'));
app.use((err: any, req: any, res: any, next: any) => {
	console.log('This is the invalid field ->', err.field);
	console.log('error:', err);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	next(err);
});
app.listen(port, appListening);
