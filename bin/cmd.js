#!/usr/bin/env node

var fs = require('fs');
var _ = require('lodash');
var program = require('commander');

program
  .version('0.0.1')
  .usage('-f <*.xlsx> -o outputdir [-w]')
  .option('-w, --watch', 'watch')
  .option('-f, --file <*.xlsx>', 'to convert xlst file')
  .option('-o, --output <outpuDir>', 'output directory')
  .option('-a, --buildaction', 'convert actons file to js')
  .parse(process.argv);

if(!program.file || !fs.existsSync(program.file)){
	console.error('You MUST specify an excel file with -f');
	process.exit(1);
}
if(!program.output){
	console.error('File not exist, You MUST specify an dir with -o');
	process.exit(1);
}

function dump(filename, outputDir){
	var parser = require('../lib/index.js');
	var data = parser(filename);
	var buf = "module.exports = {\n";
	for(var sheetName in data){
		buf += '  ' + sheetName + ": require('./" + sheetName + ".json'),\n";
		fs.writeFileSync(outputDir + '/' + sheetName + '.json', JSON.stringify(data[sheetName]));
	}
	buf += '};';
	fs.writeFileSync(outputDir + '/index.js', buf);
	console.log('data dumped!');
}

function dumpActions(filename, outputDir){
	var parser = require('../lib/buildAction.js');
	var data = parser(filename);
	var buf = '';
	for (var i in data) {
		var args = data[i].args.join(',');
		buf += i + ': function(' + args + '){return ' + data[i].action + '},\n';
	}
	buf = 'module.exports = {\n' + buf + '}';
	fs.writeFileSync(outputDir, buf);
	console.log(outputDir + ' dumped!');
}

var mydump;
if(program.buildaction){
	mydump = _.debounce(dumpActions, 250);
}else{
	mydump = _.debounce(dump, 250);
}

if(program.watch){
	fs.watch(program.file, function (event, filename) {
		mydump(program.file, program.output);
	});
	console.log('watching...');
}

mydump(program.file, program.output);
