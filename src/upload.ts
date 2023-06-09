import {allowedExtensions, s3Endpoint as endpoint, s3Region as region, s3Bucket} from './constants';
import multer, {type FileFilterCallback, type StorageEngine} from 'multer';
import path from 'path';
import {type Request, type Express} from 'express';
import {S3Client} from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

const s3: S3Client = new S3Client({endpoint: 'https://s3.fr-par.scw.cloud', region});

const generateS3Filename = (req: Request, file: Express.Multer.File): string =>
	`${req.params?.accounts}/${req.params?.scripts}/${file.originalname}`;

const storage: StorageEngine = multerS3({
	s3,
	bucket: 'stage-cf-worker',
	metadata(req: Request, file: Express.Multer.File, cb) {
		cb(null, {fieldName: file.fieldname});
	},
	key(req: Request, file: Express.Multer.File, cb) {
		cb(null, generateS3Filename(req, file));
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
