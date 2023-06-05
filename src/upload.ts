
// Configuration de Multer pour enregistrer les fichiers dans un dossier spécifique
import multer from 'multer';
import path from 'path';
import {type Request} from 'express';

const storage = multer.diskStorage({
	destination: './uploads',
	filename(req: Request, {originalname, fieldname}: Express.Multer.File, cb) {
		const extension = path.extname(originalname);
		const fileName = `${fieldname}-${Date.now()}${extension}`;
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

export {upload};
