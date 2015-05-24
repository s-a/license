var path = require("path");
var fs = require("fs");
yaml = require('js-yaml');


var labelWidth = 50;
var lic = "MIT";

var theTextWidth = {
	"unlicense":100,
	"no-license":85,
	"mpl-2.0":165,
	"mit":85,
	"lgpl-3.0":245,
	"lgpl-2.1":245,
	"isc":85,
	"gpl-3.0":205,
	"gpl-2.0":205,
	"epl-1.0":165,
	"cc0-1.0":245,
	"bsd-3-clause":250,
	"bsd-2-clause":205,
	"artistic-2.0":125,
	"apache-2.0":125,
	"agpl-3.0":245
};


var svg = function(options) {
	var code = [];
	code.push('<svg xmlns="http://www.w3.org/2000/svg" width="' + options.width + '" height="20">');
	code.push('	<linearGradient id="a" x2="0" y2="100%">');
	code.push('		<stop offset="0" stop-color="#bbb" stop-opacity=".1"/>');
	code.push('		<stop offset="1" stop-opacity=".1"/>');
	code.push('	</linearGradient>');
	code.push('	<rect rx="3" width="' + options.width + '" height="20" fill="#555"/>');
	code.push('	<rect rx="3" x="63" width="' + options.textWidth + '" height="20" fill="#4c1"/>');
	code.push('	<path fill="#4c1" d="M63 0h4v20h-4z"/>');
	code.push('	<rect rx="3" width="' + options.width + '" height="20" fill="url(#a)"/>');
	code.push('	<g fill="#fff" text-anchor="left" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">');
	code.push('		<text x="10" y="15" fill="#010101" fill-opacity=".3">');
	code.push('			License');
	code.push('		</text>');
	code.push('		<text x="10" y="14">');
	code.push('			License');
	code.push('		</text>');
	code.push('		<text x="75" y="15" fill="#010101" fill-opacity=".3">');
	code.push('			' + options.title);
	code.push('		</text>');
	code.push('		<text x="75" y="14">');
	code.push('			' + options.title);
	code.push('		</text>');
	code.push('	</g>');
	code.push('</svg>');

	return {data : code.join("\n")};
};


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
  	doc._id = path.basename(file, '.txt');
  	/*doc.textWidth = 43;
  	doc.width = 106;*/
  	doc.textWidth = theTextWidth[path.basename(file, '.txt')];
  	doc.width = 63 + doc.textWidth;
  	var svgFilename = __dirname + '/../img/' + path.basename(file, '.txt') + '.svg';
  	fs.writeFileSync(svgFilename, svg(doc).data);

	/*
	badges[path.basename(file, '.txt')] = badge("License", licenseName, { 
		categoryColor: "#00A300",
		width: (licenseName.length*4) + labelWidth + 30,
		labelWidth: labelWidth
	});
*/
	var l = 'https://s-a.github.io/license/?license=' + path.basename(file, '.txt') + '&fullname=Stephan%20Ahlf&year=2015&profile=https://github.com/s-a&projectUrl=https://github.com/s-a/license&projectName=license';
	var lnk = '[<img src="https://s-a.github.io/license/img/' + path.basename(file, '.txt') + '.svg" />](' + l + ' "' + ""/*doc.description*/ + '")';
	markdownLinks.push(lnk);
	markdownLinks.push("\n");
}

fs.writeFileSync(path.join(__dirname, "..", "markdownLinks.txt"), markdownLinks.join("\n"));