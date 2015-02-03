 var streamify = require('stream-array'),
     assert = require('stream-assert'),
     should = require('should')()

var refine = require('../lib/v2')
var transform = refine.transform
var select = refine.select

describe('copy', function(){

	it('Make the second column copy to the third', function(done){ 
		streamify([
    		['blah', 'Google', 'a']
    	])
  
    	.pipe(refine.start())
    	.pipe(select.cols(1, transform.copy()))
    	.pipe(refine.end())
  
    	.pipe(assert.first(function(row) {
        	row.should.be.eql(['blah', 'Google', 'Google', 'a'])
    	}))
    	.pipe(assert.end(done))
	})

})