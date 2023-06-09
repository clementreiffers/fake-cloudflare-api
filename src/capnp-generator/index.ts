import {getAllFilesPathsFromBucket, createListFiles} from './s3-bucket';
import {andThen, pipeWith, prop, tap} from 'ramda';
import generator from './generator';
import {createFileInS3} from './upload';
import {bucketName, fileName, s3Endpoint} from './constants';
import {handleAccountsServices} from '../handlers';
import {type Request, type Response} from 'express';

const handleGenerationAndUploadCapnp = (req: Request, res: Response) => {
	pipeWith(andThen)([
		getAllFilesPathsFromBucket(bucketName, s3Endpoint),
		prop('Contents'),
		createListFiles,
		generator(8080, '*'),
		createFileInS3(bucketName, fileName),
		() => {
			handleAccountsServices(req, res);
		},
	])();
};

export {handleGenerationAndUploadCapnp};
