//test: require('../../../excel-json/test/actions.js')
var fs = require('fs');
var xlsx = require('xlsx');

var types = {
	scaleTo: 'cc.scaleTo',
	delayTime: 'cc.delayTime',
	fadeIn: 'cc.fadeIn',
	fadeTo: 'cc.fadeTo',
	moveBy: 'cc.moveBy',
	moveTo: 'cc.moveTo',
	callFunc: 'cc.callFunc',
}

function buildAction(buf) {
	var parts = buf.split(/\s+/);
	var name = parts.shift();
	var action = types[name];
	if (action) {
		action += '(' + parts.join(',') + ')';
	}
	return action || buf;
}

function buildRow(data) {
	var r = [];
	var idx = 1;
	var args = [];
	if(data.args) args = data.args.trim().split(/\s+/);
	var result = {
		args: args,
		action: ''
	};
	while (data[idx]) {
		var buf = data[idx].trim();
		if (buf) {
			var spawn = buf.split(/\r?\n/);
			for (var i = 0; i < spawn.length; i++) {
				spawn[i] = buildAction(spawn[i]);
			}
			if (spawn.length > 1) {
				r.push('cc.spawn(' + spawn.join(',') + ')');
			} else if (spawn.length === 1) {
				r.push(spawn[0]);
			}
		}
		idx++;
	}
	if (r.length > 1) {
		result.action = 'cc.sequence(' + r.join(',') + ')';
	}else if(r.length === 1){
		result.action = r[0];
	}
	return result;
}

var buildSheet = function(data) {
	var result = {};
	for (var i = 0; i < data.length; i++) {
		result[data[i]['id']] = buildRow(data[i]);
	}
	return result;
}

module.exports = function(filename) {
	var data = xlsx.readFile(filename);
	var sheets = data.Sheets;
	var result = {};
	debugger
	for (var i in sheets) {
		var actions = buildSheet(xlsx.utils.sheet_to_json(sheets[i], {
			raw: true
		}));
		for (var i in actions) {
			result[i] = actions[i];
		}
	}
	return result;
};