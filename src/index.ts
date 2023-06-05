import express, {type Express} from 'express';
import {port} from './constants';
import routes, {setRoutes} from './routes';
import {appListening} from './handlers';
import {upload} from './upload';

const app: Express = setRoutes(express(), routes);
app.use(upload.array('files'));
app.listen(port, appListening);
