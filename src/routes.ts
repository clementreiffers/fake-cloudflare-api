import {handleHelloWorld, handleMemberships, handleUser, handleSubdomain, handleAccountsScripts} from './handlers';
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
		handler: handleAccountsScripts,
	},
];

const postRoutes: RouteList = [
	{
		method: 'post',
		route: '/client/v4/accounts/:accounts/workers/scripts/:script/subdomain',
		handler: handleAccountsScripts,
	},
];

const putRoutes: RouteList = [
	{
		method: 'put',
		route: '/client/v4/accounts/:accounts/workers/scripts/:scripts',
		handler: handleAccountsScripts,
		upload: upload.fields([{name: 'js', maxCount: 10}, {name: 'wasm', maxCount: 10}]),
	},
];

const routes: RouteList = [...getRoutes, ...postRoutes, ...putRoutes];

const setRoutes = (app: Express, routes: RouteList): Express => {
	const setRouteFromMethod = (app: Express) => ({route, method, upload, handler}: Route): Express => {
		switch (method) {
			case 'get': return app.get(route, handler);
			case 'post': return app.post(route, handler);
			case 'put': return app.put(route, upload, handler);
			default: return app;
		}
	};

	routes.forEach(setRouteFromMethod(app));
	return app;
};

export default routes;
export {setRoutes};
