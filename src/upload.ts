import {allowedExtensions, s3Region as region} from './constants';
import multer, {type FileFilterCallback, type StorageEngine} from 'multer';
import path from 'path';
import {type Request} from 'express';
import {S3Client} from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import {S3} from 'aws-sdk';

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

const createFileInS3 = (bucketName: string, fileName: string, account: string) =>
	async (fileContent: string): Promise<void> => {
		const params = {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			Bucket: bucketName,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			Key: `${account}/${fileName}`,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			Body: fileContent,
		};

		try {
			await new S3({endpoint: 's3.fr-par.scw.cloud'}).putObject(params).promise();
			console.log(`[capnp-generator] capnp file correctly uploaded into ${bucketName} bucket`);
		} catch (error) {
			console.error('[capnp-generator] capnp file has not been correclty published', error);
		}
	};

export {upload, createFileInS3};
