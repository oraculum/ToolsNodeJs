var fs = require('fs');
var path = require("path");
var readline = require("readline");
var lineByLine = require("n-readlines");

//uso para limpar os arquivos do amplenote migrados

const cont = './Amplenote/';
const tagAmplenote = "---";

async function processLine(file) {
	const fileStream = fs.createReadStream(file);
	
	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
	
	var indexLine = 0;
	var startMetaData = false;
	linecheck: 
		for await (const line of rl) {
			indexLine += 1;
			
			if (line == tagAmplenote && startMetaData)
				break linecheck;
			
			if (startMetaData == false)
				startMetaData = line == "---";
		}
	
	console.log(`index file ${file}: ${indexLine}`);
	
	fs.readFile(file, 'utf8', function (err, data) {
		var linesToSave = data.split('\n').slice(indexLine).join('\n');
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