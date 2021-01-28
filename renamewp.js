var fs = require('fs');
var path = require("path");

const cont = '../content/';


function ThroughDirectory(Directory) {
	fs.readdirSync(Directory).forEach(File => {
		const file = path.join(Directory, File);
		if (fs.statSync(file).isDirectory()) return ThroughDirectory(file);
		else if (!file.includes('.DS_Store'))
		{
			var newFile = file.substr(0, file.lastIndexOf(".")) + ".md";
  			console.log(`Rename ${file} to ${newFile}`);
		  	fs.renameSync(`${file}`, `${newFile}`);
		}
	});
}

ThroughDirectory(cont);

console.log('Finalizado!');
