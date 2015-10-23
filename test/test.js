var assert = require('chai').assert;
var datatype = require('../lib/datatype.js');
var parser = require('../lib/index.js');

var data = parser('./test/data.xlsx');
var table = data.test;

describe('test', () => {

	it('test all', ()=>{
		assert.ok(Object.keys(data).length === 8);
		assert.isObject(data.test);
		assert.isObject(data.rule);
		assert.isObject(data.player);
		assert.isObject(data.res);
		assert.isObject(data.color);
		assert.isObject(data.font);
		assert.isObject(data.ui);
		assert.isObject(data.scene);
		//行数
		assert.ok(Object.keys(data.test).length === 6);
		//列数
		assert.ok(Object.keys(data.test.int).length === 7);
	});

	it('test int data', ()=>{
		assert.ok(table.int.int === 123);
		assert.ok(table.int.string === '123');
		assert.ok(table.int.bool === true);
		assert.ok(table.int.number === 123);
		assert.ok(table.int.json === 123);
		assert.ok(table.int.raw === 123);
	});

	it('test number data', ()=>{
		assert.ok(table.number.int === 1);
		assert.ok(table.number.string === '1.23');
		assert.ok(table.number.bool === true);
		assert.ok(table.number.number === 1.23);
		assert.ok(table.number.json === 1.23);
		assert.ok(table.number.raw === 1.23);
	});

	it('test string data', ()=>{
		assert.ok(table.string.int === 123);
		assert.ok(table.string.string === '123');
		assert.ok(table.string.bool === true);
		assert.ok(table.string.number === 123);
		assert.ok(table.string.json === 123);
		assert.ok(table.string.raw === 123);
	});

	it('test bool data', ()=>{
		assert.ok(table.bool.int === 1);
		assert.ok(table.bool.string === 'true');
		assert.ok(table.bool.bool === true);
		assert.ok(table.bool.number === 1);
		assert.ok(table.bool.json === true);
		assert.ok(table.bool.raw === true);
	});

	it('test json data', ()=>{
		assert.ok(table.json.int === 0);
		assert.ok(table.json.string === '{"x":1, "y":2}');
		assert.ok(table.json.bool === true);
		assert.ok(table.json.number === 0);
		assert.deepEqual(table.json.json, {x:1,y:2});
		assert.ok(table.json.raw === '{"x":1, "y":2}');
	});

	it('test empty data', ()=>{
		assert.ok(table.empty.int === 0);
		assert.ok(table.empty.string === '');
		assert.ok(table.empty.bool === false);
		assert.ok(table.empty.number === 0);
		assert.ok(table.empty.json === null);
		assert.ok(table.empty.raw == undefined);
	});

	it('ok', ()=>{

	})	
});