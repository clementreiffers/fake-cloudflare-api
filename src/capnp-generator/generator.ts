import {type Filename, type FilenameList, type Ip, type WorkerType} from './types';
import {comparator, join, last, map, pipe, replace, sort, test, trim, split} from 'ramda';

const workerGenerator = (file: Filename, nth: number): WorkerType => {
	const hasEntrypoint = test(/entrypoint/);

	const compareEntrypoint = comparator((a: string, b: string) => hasEntrypoint(a) && !hasEntrypoint(b));

	const getFilenameOnly = (file: string): string => file.split('/').pop()!;

	const workerModuleGenerator = (file: string) =>
		/\.(m|)js$/.test(file)
			? `(name = "entrypoint", esModule = embed "${file}")`
			: `(name = "${getFilenameOnly(file)}", wasm = embed "${file}")`;

	const removeFirstAndLastCommas = (str: string): string => pipe(
		trim,
		replace(/^,*/, ''),
		replace(/,*$/, ''),
	)(str);

	const manageModules = (file: Filename): string =>
		pipe(
			map(workerModuleGenerator),
			sort(compareEntrypoint),
			join(','),
			removeFirstAndLastCommas,
		)(file);

	const name = `w${nth}`;

	const capnp
        = `const ${name} :Workerd.Worker = (modules = [${manageModules(file)}],compatibilityDate = "2023-02-28");`;

	return {name, capnp};
};

const createService = (worker: WorkerType): string =>
	`(name = "${worker.name}", worker = .${worker.name}),`;

const servicesCapnpify = (workerList: WorkerType[]): string =>
	`services = [${workerList.map(createService).join('')}],`;

const createSocket = (defaultPort: number, defaultIp: string) => (worker: WorkerType) =>
	`(name = "http", address = "${defaultIp}:${defaultPort++}", http = (), service = "${worker.name}")`;

const socketsCapnpify = (workerList: WorkerType[], defaultPort: number, defaultIp: Ip): string =>
	`sockets = [${workerList.map(createSocket(defaultPort, defaultIp)).join(',')}]`;

const configGenerator = (workerList: WorkerType[], defaultPort: number, defaultIp: Ip) =>
	`const config :Workerd.Config = (${servicesCapnpify(workerList)}${socketsCapnpify(workerList, defaultPort, defaultIp)});`;

const generator = (defaultPort: number, defaultIp: Ip) => (filenames: FilenameList): string => {
	// Generation of all workers first

	const workers: WorkerType[] = filenames.map(workerGenerator);
	const config = configGenerator(workers, defaultPort, defaultIp);
	return `using Workerd = import "/workerd/workerd.capnp"; ${config} ${workers.map(w => w.capnp).join('')}`;
};

export default generator;
