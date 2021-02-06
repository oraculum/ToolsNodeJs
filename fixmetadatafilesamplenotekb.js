var fs = require('fs');
var path = require("path");
var readline = require("readline");
var lineByLine = require("n-readlines");

// uso para limpar os arquivos do amplenote migrados
// colocamos meta tags no ininicio dos arquivos.

const cont = './Amplenote/';
const tagAmplenote = "---";

async function processLine(file) {
	console.log(`Fix meta-data in file: ${file}`);
	
	fs.readFile(file, 'utf8', function (err, data) {
		var bufferToSave = data.split('\n');
		bufferToSave.unshift(tagAmplenote);
		bufferToSave.unshift(`Keywords: #produtividade`);
		bufferToSave.unshift(tagAmplenote);
		
		var linesToSave = bufferToSave.join('\n');
		
		fs.writeFile(file, linesToSave, function (err) {
			if (err) return console.log(err);
		});
	})
	
}

function ThroughDirectory(Directory) {
	fs.readdirSync(Directory).forEach(File => {
		const file = path.join(Directory, File);
		if (fs.statSync(file).isDirectory()) 
			return ThroughDirectory(file);
		else if (!file.includes('.DS_Store'))
		{
			console.log(`file > ${file}`);
			var i = 0;
			var excluir = false;
			
			processLine(file);
		}
	});
}

ThroughDirectory(cont);
console.log('Finalizado!');