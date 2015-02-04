var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')()

var refine = require('../lib/v2')
var transform = refine.transform
var select = refine.select

describe('filter', function() {

    it('check that a certain column matches the filter', function(done) {

        streamify([
            ['Denver', 2, 3]
        ])
            .pipe(refine.start())
            .pipe(select.cols(0, transform.filter('\\d+')))
            .pipe(refine.end())
            
            .pipe(assert.first(function(row) {
                row.should.be.eql(['---', 2, 3])
            }))
            .pipe(assert.end(done))

    })

    it('should check that all values match a given filter', function(done) {

        streamify([
            [11,23,'Denver']
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.filter("\\d+")))
            .pipe(refine.end())
            
            .pipe(assert.first(function(row) {
                row.should.be.eql([11, 23, '---'])
            }))
            .pipe(assert.end(done))

    })

})