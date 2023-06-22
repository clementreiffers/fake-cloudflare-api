import {S3} from 'aws-sdk';

const s3: S3 = new S3({
	endpoint: 's3.fr-par.scw.cloud',
});

export const createFileInS3 = (bucketName: string, fileName: string, account: string) =>
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
			await s3.putObject(params).promise();
			console.log(`[capnp-dockerfile-generator] ${fileName} correctly uploaded into ${bucketName} bucket`);
		} catch (error) {
			console.error(`[capnp-dockerfile-generator] ${fileName} has not been correclty published`, error);
		}
	};

