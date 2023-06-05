
import multer, {type FileFilterCallback, type StorageEngine} from 'multer';
import path from 'path';
import {type Request, type Express} from 'express';

const storage: StorageEngine = multer.diskStorage({
	destination: './uploads',
	filename(req: Request, {originalname}: Express.Multer.File, cb) {
		cb(null, originalname); // Nom du fichier
	},
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
	const allowedExtensions = ['.js', '.wasm'];

	if (allowedExtensions.includes(path.extname(file.originalname))) {
		cb(null, true);
	} else {
		cb(new Error('file not accepted because not js or wasm'));
	}
};

const upload: multer.Multer = multer({
	storage,
	fileFilter,
});

export {upload};
