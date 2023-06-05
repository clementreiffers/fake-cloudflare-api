import {handleHelloWorld, handleMemberships, handleUser, handleSubdomain, handleAccountsScripts} from './handlers';
import {upload} from './upload';
import {type Route, type RouteList} from './types';
import {type Express} from 'express';
import multer from 'multer';

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

const storage = multer.diskStorage({
	destination: './uploads',
	filename(req, file, cb) {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
		cb(null, file.fieldname + '-' + uniqueSuffix);
	},
});

const up = multer({storage});

const putRoutes: RouteList = [
	{
		method: 'put',
		route: '/client/v4/accounts/:accounts/workers/scripts/:scripts',
		handler: handleAccountsScripts,
		/* Upload: upload.fields([
			{name: 'index.js'},
			{name: 'shim.js'},
			{name: './29bae8a03647eb9b55a10b5f2203b23d2b970081-index.wasm'},
		]),
		 */
		upload: up.any(),
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
