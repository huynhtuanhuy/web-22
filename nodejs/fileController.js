const fs = require('fs');

const writeFile = (filePath, data) => {
	fs.writeFileSync(filePath, data);
};

const readFile = (filePath) => {
	const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
	return data;
};

module.exports = {
	writeFile: writeFile,
	readFile: readFile
}