#!/usr/bin/env node

var fs = require('fs');
var _ = require('lodash');
var program = require('commander');
var parser = require('../lib/index.js');

program
  .version('0.0.1')
  .usage('-f <*.xlsx> -o outputdir [-w]')
  .option('-w, --watch', 'watch')
  .option('-f, --file <*.xlsx>', 'to convert xlst file')
  .option('-o, --output <outpuDir>', 'output directory')
  .parse(process.argv);

if(!program.file || !fs.existsSync(program.file)){
	console.error('You MUST specify an excel file with -f');
	process.exit(1);
}
if(!program.output || !fs.existsSync(program.output)){
	console.error('File not exist, You MUST specify an dir with -o');
	process.exit(1);
}

function dump(filename, outputDir){
	var data = parser(filename);
	var buf = "module.exports = {\n";
	for(var sheetName in data){
		buf += '  ' + filename + ": require('./" + filename + ".json'),\n";
		fs.writeFileSync(outputDir + '/' + sheetName + '.json', JSON.stringify(data[sheetName]));
	}
	buf += '};';
	fs.writeFileSync(outputDir + '/index.js', buf);
	console.log('data dumped!');
}

var mydump = _.debounce(dump, 250);

if(program.watch){
	fs.watch(program.file, function (event, filename) {
		mydump(program.file, program.output);
	});
	console.log('watching...');
}

dump(program.file, program.output);
