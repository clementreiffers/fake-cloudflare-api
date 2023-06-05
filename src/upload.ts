
import multer, {type FileFilterCallback, type StorageEngine} from 'multer';
import path from 'path';
import {type Request, type Express} from 'express';
import {allowedExtensions} from './constants';

const storage: StorageEngine = multer.diskStorage({
	destination: './uploads',
	filename(req: Request, {originalname}: Express.Multer.File, cb) {
		cb(null, originalname); // Nom du fichier
	},
});

const isFileExtensionAccepted = (filename: string): boolean =>
	allowedExtensions.includes(path.extname(filename));

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
	if (isFileExtensionAccepted(file.originalname)) {
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
