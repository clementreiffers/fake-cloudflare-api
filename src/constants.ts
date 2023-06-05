import routes from './routes';

const port = 3000;

const membershipJson = 'src/defaultResponses/memberships_response_1.json';

const getAccountServicesJson = 'src/defaultResponses/get_accounts_services.json';

const getSubdomainJson = 'src/defaultResponses/get_subdomain.json';

const allowedExtensions: string[] = ['.js', '.wasm'];

export {port, membershipJson, getAccountServicesJson, getSubdomainJson, allowedExtensions, routes};
