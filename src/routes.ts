import {
	handleHelloWorld,
	handleMemberships,
	handleUser,
	handleSubdomain,
	handleAccountsServices,
} from './handlers';
import {upload} from './upload';
import {type Route, type RouteList} from './types';
import {type Express} from 'express';

const getRoutes: RouteList = [
	{
		method: 'get',
		route: '/',
		handler: handleHelloWorld,
	},
	{
		method: 'get',
		route: '/client/v4/user',
		handler: handleUser,
	},
	{
		method: 'get',
		route: '/client/v4/user',
		handler: handleUser,
	},
	{
		method: 'get',
		route: '/client/v4/memberships',
		handler: handleMemberships,
	},
	{
		method: 'get',
		route: '/client/v4/accounts/:accounts/workers/subdomain',
		handler: handleSubdomain,
	},
	{
		method: 'get',
		route: '/client/v4/accounts/:accounts/workers/services/:services',
		handler: handleAccountsServices,
	},
];

const postRoutes: RouteList = [
	{
		method: 'post',
		route: '/client/v4/accounts/:accounts/workers/scripts/:script/subdomain',
		handler: handleAccountsServices,
	},
];

const putRoutes: RouteList = [
	{
		method: 'put',
		route: '/client/v4/accounts/:accounts/workers/scripts/:scripts',
		handler: handleAccountsServices,
		upload: upload.any(),
	},
];

const routes: RouteList = [...getRoutes, ...postRoutes, ...putRoutes];

const setRoutes = (app: Express, routes: RouteList): Express => {
	const setRouteFromMethod = (app: Express) => ({route, method, upload, handler}: Route): Express => {
		switch (method) {
			case 'get': return app.get(route, handler);
			case 'post': return app.post(route, handler);
			case 'put': return app.put(route, upload!, handler);
			default: return app;
		}
	};

	routes.forEach(setRouteFromMethod(app));
	return app;
};

export default routes;
export {setRoutes};
