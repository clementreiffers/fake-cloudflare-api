import {type Multer} from 'multer';
import {type Request, type Response} from 'express';

type Route = {
	method: 'get' | 'post' | 'put';
	route: string;
	handler: (req: Request, res: Response) => void;
	upload?: any; // Todo: inspect the type used here
};

type RouteList = Route[];

export type {Route, RouteList};

