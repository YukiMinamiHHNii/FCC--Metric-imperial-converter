const chai= require('chai'),
			assert= chai.assert;

suite('Unit tests', ()=>{
	test('Testing the tests', done=>{
		assert.equal(1, 1, 'These numbers are equal');
		assert.notEqual(1, 3, 'These others are not');
		done();
	});
});