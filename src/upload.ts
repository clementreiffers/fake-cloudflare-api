
import multer, {type FileFilterCallback, type StorageEngine} from 'multer';
import path from 'path';
import {type Request, type Express} from 'express';
import {allowedExtensions} from './constants';
import {S3Client} from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

const s3Client: S3Client = new S3Client({
	endpoint: 'https://s3.fr-par.scw.cloud',
	region: 'fr-par',
});

const storage: StorageEngine = multerS3({
	s3: s3Client,
	bucket: 'stage-cf-worker',
	metadata(req: Request, file: Express.Multer.File, cb) {
		cb(null, {fieldName: file.fieldname});
	},
	key(req: Request, file: Express.Multer.File, cb) {
		cb(null, file.originalname);
	},
});
const isFileExtensionAccepted = (filename: string): boolean =>
	allowedExtensions.includes(path.extname(filename));

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
	if (isFileExtensionAccepted(file.originalname)) {
		cb(null, true);
	} else {
		cb(new Error('file not accepted because not js or wasm'));
	}
};

const upload = multer({storage, fileFilter});

export {upload};
