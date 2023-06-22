import {getAllFilesPathsFromBucket, createListFiles} from './s3-bucket';
import {andThen, pipeWith, prop, tap} from 'ramda';
import generator from './generator';
import {createFileInS3} from './upload';
import {bucketName, fileName, s3Endpoint} from './constants';
import {handleAccountsServices} from '../handlers';
import {type Request, type Response} from 'express';
import {dockerfile} from '../constants';

const uploadCapnpAndDockerfile = async (req: Request, res: Response) => {
	const {accounts} = req.params;
	pipeWith(andThen)([
		getAllFilesPathsFromBucket(bucketName, accounts, s3Endpoint),
		prop('Contents'),
		createListFiles,
		generator(8080, '*'),
		createFileInS3(bucketName, fileName, accounts),
		() => dockerfile,
		createFileInS3(bucketName, 'Dockerfile', accounts),
		() => {
			handleAccountsServices(req, res);
		},
	])();
};

export {uploadCapnpAndDockerfile};
