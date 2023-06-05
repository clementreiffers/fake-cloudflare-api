
import multer, {type StorageEngine} from 'multer';
import path from 'path';
import {type Request, type Express} from 'express';

const storage: StorageEngine = multer.diskStorage({
	destination: './uploads',
	filename(req: Request, {originalname}: Express.Multer.File, cb) {
		cb(null, originalname); // Nom du fichier
	},
});

// Filtrer les fichiers par extension
const fileFilter = (req: any, file: any, cb: any) => {
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

export {upload};
