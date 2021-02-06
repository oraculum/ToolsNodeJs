var fs = require('fs');
var path = require("path");
var readline = require("readline");
var lineByLine = require("n-readlines");

const cont = '../content/';


function ThroughDirectory(Directory) {
	fs.readdirSync(Directory).forEach(File => {
		const file = path.join(Directory, File);
		if (fs.statSync(file).isDirectory()) 
			return ThroughDirectory(file);
		else if (!file.includes('.DS_Store'))
		{
			console.log(`file > ${file}`);
			
			fs.readFile(file, 'utf8', function (err, data) {
				var formatted = data.replace(`link: http://viverdecristo.org`, `link: `);
				fs.writeFile(file, formatted, 'utf8', function (err) {
					if (err) return console.log(err);
				});
			});
			
			//const liner = new lineByLine(file);
			//let line;
			//while (lineCoded = liner.next()) {
			//	line = lineCoded.toString('utf8');
			//	if (line.startsWith(`link: http://viverdecristo.org`))
			//		console.log(line);
			//}
			
			//const fileStream = fs.createReadStream(file);
			//const rl = readline.createInterface({ 
			//	input: fileStream,
			//	crlfDelay: Infinity,
			//});
			//
			//rl.on('line', function (line) {
			//	if (line.startsWith(`link: http://viverdecristo.org`))
			//		console.log(line);
			//})
		}
	});
}

ThroughDirectory(cont);
console.log('Finalizado!');