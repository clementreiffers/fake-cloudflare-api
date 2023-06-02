import express, {type Express} from 'express';
import multer from 'multer';
import {handleHelloWorld, handleUser, handleMemberships, handleAccountsScripts, handleAccountsServices, handleSubdomain, appListening} from './handlers';
import {port} from './constants';
import path from 'path';

const app: Express = express();

// Configuration de Multer pour enregistrer les fichiers dans un dossier spécifique
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/'); // Dossier de destination des fichiers
	},
	filename(req, file, cb) {
		const extension = path.extname(file.originalname);
		const fileName = `${file.fieldname}-${Date.now()}${extension}`;
		console.log(fileName);
		cb(null, fileName); // Nom du fichier
	},
});

// Filtrer les fichiers par extension
const fileFilter = function (req: any, file: any, cb: any) {
	const allowedExtensions = ['.js', '.wasm'];

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	if (allowedExtensions.includes(path.extname(file.originalname))) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		cb(null, true); // Accepter le fichier
	} else {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		cb(new Error('Extension de fichier non prise en charge'), false); // Rejeter le fichier
	}
};

// Configurer Multer avec les options
const upload = multer({
	storage,
	fileFilter,
});

app.get('/', handleHelloWorld)
	.get('/client/v4', handleUser)
	.get('/client/v4/user', handleUser)
	.get('/client/v4/memberships', handleMemberships)
	.get('/client/v4/accounts/:accounts/workers/subdomain', handleSubdomain)
	.get('/client/v4/accounts/:accounts/workers/services/:services', handleAccountsServices)
	.post('/client/v4/accounts/:accounts/workers/scripts/:script/subdomain', handleAccountsScripts)
	.put('/client/v4/accounts/:accounts/workers/scripts/:scripts', upload.fields([{name: 'shim.js'}, {name: 'index.js'}, {name: '*'}]), handleAccountsScripts)
	.all('/', handleUser)
	.use((err: any, req: any, res: any, next: any) => {
		console.log('This is the invalid field ->', err.field);
		console.log('error:', err);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		next(err);
	})
	.use(upload.array('files'))
	.listen(port, appListening);

