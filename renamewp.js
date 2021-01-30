var fs = require('fs');
var path = require("path");
var mkdirp = require("mkdirp");


const cont = '../content/';


function ThroughDirectory(Directory) {
	fs.readdirSync(Directory).forEach(File => {
		const file = path.join(Directory, File);
		if (fs.statSync(file).isDirectory()) return ThroughDirectory(file);
		else if (!file.includes('.DS_Store'))
		{
			//var newDir = file.substr(0, file.lastIndexOf(".")) + ".mdx";
			var newDir = file.substr(0, file.lastIndexOf("."));
			onlyFileName = newDir.substr(file.lastIndexOf("/") + 1);
			
			console.log(`onlyFileName ${onlyFileName}`);
			if (onlyFileName.length > 11 && onlyFileName.startsWith("20"))
				newDir = `${newDir.substr(0, file.lastIndexOf("/") + 1)}${onlyFileName.substr(11, onlyFileName.length - 11)}/`;
			else
				newDir = `${newDir.substr(0, file.lastIndexOf("/") + 1)}${onlyFileName}/`;
				
			mkdirp.sync(newDir);
			
			var newDirPath = `${newDir}/index.mdx`;
			console.log(`Rename to ${newDirPath}`);
			fs.renameSync(`${file}`, `${newDirPath}`);
		}
	});
}

ThroughDirectory(cont);

console.log('Finalizado!');
