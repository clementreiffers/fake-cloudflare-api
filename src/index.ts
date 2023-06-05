import express, {type Express} from 'express';
import {routes, port} from './constants';
import {setRoutes} from './routes';
import {handleAppListening} from './handlers';

const app: Express = setRoutes(express(), routes);
app.listen(port, handleAppListening);
