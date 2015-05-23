var badges = module.exports = {};
var badge = require("./badge");
var path = require("path");
var fs = require("fs");
yaml = require('js-yaml');


var labelWidth = 50;
var lic = "MIT";


var dir = require("path").join(__dirname, "..", "_licenses");

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

var files = [];
var markdownLinks = [];
getFiles(dir, files);

for (var i = 0; i < files.length; i++) {
	var file = files[i];

	// Get document, or throw exception on error
	try {
		var data = fs.readFileSync(file, 'utf8').toString().split("---");
	  	var doc = yaml.safeLoad(data[1]);

		fs.writeFileSync(path.join(__dirname, "..", path.basename(file)), data[2]);
	  console.log(file);
/*
	  console.log(doc.nickname || doc.title);
	  console.log(doc.description);
	  console.log("---");
*/	} catch (e) {
	  	console.log(e);
	}
	//break;
	var licenseName = doc.nickname || doc.title;
  	//console.log(licenseName, licenseName.length);
	badges[path.basename(file, '.txt')] = badge("License", licenseName, { 
		categoryColor: "#00A300",
		width: (licenseName.length*4) + labelWidth + 30,
		labelWidth: labelWidth
	});

	var l = 'https://s-a.github.io/license/?license=' + path.basename(file, '.txt') + '&fullname=Stephan%20Ahlf&year=2015&profile=https://github.com/s-a&projectUrl=https://github.com/s-a/license&projectName=license';
	var lnk = '[<img src="https://s-a.github.io/license/img/' + path.basename(file, '.txt') + '.svg" />](' + l + ' "' + ""/*doc.description*/ + '")';
	markdownLinks.push(lnk);
	markdownLinks.push("\n");
}

fs.writeFileSync(path.join(__dirname, "..", "markdownLinks.txt"), markdownLinks.join("\n"));