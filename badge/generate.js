var badges = require('./')
var path = require('path')
var fs = require('fs')

var header = function  (options) {
	return [
	    '<svg height="19" xmlns="http://www.w3.org/2000/svg">', 
	    '<style type="text/css">',
	    	'text{alignment-baseline:middle;font-family:Arial,sans-serif;font-size:10px}', 
	    	'background-color{yellow}', 
    	'</style>'
	].join('');
};

var footer = '</svg>';

Object.keys(badges).forEach(function(name, i) {
  var filename = __dirname + '/../img/' + name + '.svg';
  var contents = header(badges[name].options) + badges[name].svg + footer;
  console.log("writing...", name/*, badges[name].options*/);
	//  console.log('generated "' + path.relative(__dirname, filename) + '"');
  fs.writeFileSync(filename, contents);
});
