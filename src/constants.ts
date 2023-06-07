import routes from './routes';

const port = 3000;

const allowedExtensions: string[] = ['.js', '.wasm'];

const s3Endpoint = 'https://s3.fr-par.scw.cloud';
const s3Region = 'fr-par';
const s3Bucket = 'stage-cf-worker';

export {port, allowedExtensions, routes, s3Region, s3Endpoint, s3Bucket};
