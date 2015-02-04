var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')()

var refine = require('../lib/v2')
var transform = refine.transform
var select = refine.select

describe('threshold', function() {

    it('should check specific column is above threshold', function(done) {

        streamify([
            [1, 2, 3]
        ])
            .pipe(refine.start())
            .pipe(select.cols(0, transform.threshold(4)))
            .pipe(refine.end())
            
            .pipe(assert.first(function(row) {
                row.should.be.eql(['FAIL', 2, 3])
            }))
            .pipe(assert.end(done))

    })

    it('should check that all values are above threshold', function(done) {

        streamify([
            [1,2,3]
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.threshold(2)))
            .pipe(refine.end())
            
            .pipe(assert.first(function(row) {
                row.should.be.eql(['FAIL', 2, 3])
            }))
            .pipe(assert.end(done))

    })

})