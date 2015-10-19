var assets = require('chai').assert;
var datatype = require('../lib/datatype.js');
var parser = require('../lib/index.js');

var data = parser('./test/data.xlsx');
var table = data.test;

describe('test', () => {

	it('test all', ()=>{
		assets.ok(Object.keys(data).length === 8);
		assets.isObject(data.test);
		assets.isObject(data.rule);
		assets.isObject(data.player);
		assets.isObject(data.res);
		assets.isObject(data.color);
		assets.isObject(data.font);
		assets.isObject(data.ui);
		assets.isObject(data.scene);
		//行数
		assets.ok(Object.keys(data.test).length === 6);
		//列数
		assets.ok(Object.keys(data.test.int).length === 7);
	});

	it('test int data', ()=>{
		assets.ok(table.int.int === 123);
		assets.ok(table.int.string === '123');
		assets.ok(table.int.bool === true);
		assets.ok(table.int.number === 123);
		assets.ok(table.int.json === 123);
		assets.ok(table.int.raw === 123);
	});

	it('test number data', ()=>{
		assets.ok(table.number.int === 1);
		assets.ok(table.number.string === '1.23');
		assets.ok(table.number.bool === true);
		assets.ok(table.number.number === 1.23);
		assets.ok(table.number.json === 1.23);
		assets.ok(table.number.raw === 1.23);
	});

	it('test string data', ()=>{
		assets.ok(table.string.int === 123);
		assets.ok(table.string.string === '123');
		assets.ok(table.string.bool === true);
		assets.ok(table.string.number === 123);
		assets.ok(table.string.json === 123);
		assets.ok(table.string.raw === 123);
	});

	it('test bool data', ()=>{
		assets.ok(table.bool.int === 1);
		assets.ok(table.bool.string === 'true');
		assets.ok(table.bool.bool === true);
		assets.ok(table.bool.number === 1);
		assets.ok(table.bool.json === true);
		assets.ok(table.bool.raw === true);
	});

	it('test json data', ()=>{
		assets.ok(table.json.int === 0);
		assets.ok(table.json.string === '{"x":1, "y":2}');
		assets.ok(table.json.bool === true);
		assets.ok(table.json.number === 0);
		assets.deepEqual(table.json.json, {x:1,y:2});
		assets.ok(table.json.raw === '{"x":1, "y":2}');
	});

	it('test empty data', ()=>{
		assets.ok(table.empty.int === 0);
		assets.ok(table.empty.string === '');
		assets.ok(table.empty.bool === false);
		assets.ok(table.empty.number === 0);
		assets.ok(table.empty.json === null);
		assets.ok(table.empty.raw == undefined);
	});

	it('ok', ()=>{

	})	
});