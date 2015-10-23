var assert = require('chai').assert;

var parser = require('../lib/buildAction.js');
var data = parser('./test/actions.xlsx');
var table = data.test;

describe('parse actions', () => {

	it('test all', () => {
		assert.ok(typeof data.action1 === 'object');
		assert.ok(data.action1.args.length === 3);
		assert.ok(data.action1.action.substr(0, 3) == 'cc.');
	})

})