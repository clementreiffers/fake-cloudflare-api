
// Configuration de Multer pour enregistrer les fichiers dans un dossier spécifique
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/'); // Dossier de destination des fichiers
	},
	filename(req, file, cb) {
		const extension = path.extname(file.originalname);
		const fileName = `${file.fieldname}-${Date.now()}${extension}`;
		console.log(fileName);
		cb(null, fileName); // Nom du fichier
	},
});

// Filtrer les fichiers par extension
const fileFilter = function (req: any, file: any, cb: any) {
	const allowedExtensions = ['.js', '.wasm'];

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	if (allowedExtensions.includes(path.extname(file.originalname))) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		cb(null, true); // Accepter le fichier
	} else {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		cb(new Error('Extension de fichier non prise en charge'), false); // Rejeter le fichier
	}
};

// Configurer Multer avec les options
const upload = multer({
	storage,
	fileFilter,
});

export {upload};
