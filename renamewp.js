var fs = require('fs');

const cont = './content/';

fs.readdir(cont, (err, files) => {
	files.forEach(file => {
		var newFile = file.substr(0, file.lastIndexOf(".")) + ".md";
		console.log(`Rename ${file} to ${newFile}`);

		fs.renameSync(`${cont}${file}`, `${cont}${newFile}`);
	});
});

console.log('Finalizado!');
