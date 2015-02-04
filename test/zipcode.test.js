var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')()

var refine = require('../lib/v2')
var transform = refine.transform
var select = refine.select

describe('search', function() {

    it('should change the text in a cell to a list of zipcodes', function(done) {

        streamify([
            ['Louisville', '80027', '80028']
        ])
            .pipe(refine.start())
            .pipe(select.cols(0, transform.search()))
            .pipe(refine.end())

            .pipe(assert.first(function(row) {
                row.should.be.eql(['Louisville', '80027', '80028'])
            }))
            .pipe(assert.end(done))

    })


})