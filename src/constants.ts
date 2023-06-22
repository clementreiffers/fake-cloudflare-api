import routes from './routes';

const port = 3000;

const allowedExtensions: string[] = ['.js', '.wasm'];

const s3Endpoint = 'https://s3.fr-par.scw.cloud';
const s3Region = 'fr-par';
const s3Bucket = 'stage-cf-worker';

const dockerfile = 'FROM ubuntu AS worker-builder\n'
    + 'ARG FOLDER_PATH\n'
    + 'COPY ./ ./\n'
    + 'RUN apt-get update && apt-get install -y clang libc++-dev nodejs npm\n'
    + 'RUN npm -g i workerd\n'
    // eslint-disable-next-line no-template-curly-in-string
    + 'COPY --from=download ./downloads/${FOLDER_PATH} ./downloads\n'
    + 'RUN workerd compile ./downloads/config.capnp > serv.out\n'
    + 'FROM ubuntu AS worker\n'
    + 'RUN apt-get update && apt-get install -y libc++-dev\n'
    + 'COPY --from=worker-builder serv.out .\n'
    + 'CMD ["./serv.out"]\n';

export {port, allowedExtensions, routes, s3Region, s3Endpoint, s3Bucket, dockerfile};
