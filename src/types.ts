import {type RequestHandler} from 'express';

type MethodHttp = 'get' | 'post' | 'put';

type Route = {
	method: MethodHttp;
	route: string;
	handler: RequestHandler;
	upload?: RequestHandler;
};

type RouteList = Route[];

export type {Route, RouteList};

