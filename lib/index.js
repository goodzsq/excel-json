var fs = require('fs');
var xlsx = require('xlsx');
var datatype = require('./datatype.js');
var buildSheet = function(name, data){
	var types = data[0];
	var result = {};
	for(var i=2; i<data.length;i++){
		var rowData = {};
		for(var field in types){
			var toType = datatype[types[field]];
			var v = data[i][field];
			if(toType){
				v = toType(v);
			}
			rowData[field] = v;
		}
		result[data[i]['id']] = rowData;
	}
	return result;
}

module.exports = function(filename) {
	var data = xlsx.readFile(filename);
	var sheets = data.Sheets;
	var result = {};
	for(var i in sheets){
		var match = i.match(/\((.*)\)/);
		if (match) {
			sheetName = match[1];
			result[sheetName] = buildSheet(sheetName, xlsx.utils.sheet_to_json(sheets[i], {raw:true}));
		}
	}
	return result;
};