import {getAllFilesPathsFromBucket, createListFiles} from './s3-bucket';
import {andThen, pipeWith, prop, tap} from 'ramda';
import generator from './generator';
import {createFileInS3} from './upload';
import {bucketName, fileName, s3Endpoint} from './constants';
import {handleAccountsServices} from '../handlers';
import {type Request, type Response} from 'express';

const handleGenerationAndUploadCapnp = async (req: Request, res: Response) => {
	const {accounts} = req.params;
	pipeWith(andThen)([
		getAllFilesPathsFromBucket(bucketName, accounts, s3Endpoint),
		prop('Contents'),
		createListFiles,
		generator(8080, '*'),
		tap(console.log),
		createFileInS3(bucketName, fileName, accounts),
		() => {
			handleAccountsServices(req, res);
		},
	])();
};

export {handleGenerationAndUploadCapnp};
