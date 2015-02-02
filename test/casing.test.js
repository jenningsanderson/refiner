var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')()

var refine = require('../lib/v2')
var transform = refine.transform
var select = refine.select

describe('uppercase', function() {

    it('Make just the first column upper case.', function(done) {

        streamify([
            ['google', 'b', 'c']
        ])
            .pipe(refine.start())
            .pipe(select.cols(0, transform.uppercase()))
            .pipe(refine.end())
            
            .pipe(assert.first(function(row) {
                row.should.be.eql(['GOOGLE', 'b', 'c'])
            }))
            .pipe(assert.end(done))

    })

    it('Make everything uppercase', function(done) {
        streamify([
            ['google', 'gattaca', 'running.js']
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.uppercase()))
            .pipe(refine.end())
            
            .pipe(assert.first(function(row) {
                row.should.be.eql(['GOOGLE', 'GATTACA', 'RUNNING.JS'])
            }))
            .pipe(assert.end(done))
    })
})

describe('lowercase', function() {

    it('Make the second column lowercase', function(done) {

        streamify([
            ['blah', 'GOOGLE', 'c']
        ])
            .pipe(refine.start())
            .pipe(select.cols(1, transform.lowercase()))
            .pipe(refine.end())
            
            .pipe(assert.first(function(row) {
                row.should.be.eql(['blah', 'google', 'c'])
            }))
            .pipe(assert.end(done))

    })

    it('Make everything lowercase', function(done) {

        streamify([
            ['GOOGLE', 'BLAH','ME']
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.lowercase()))
            .pipe(refine.end())
            
            .pipe(assert.first(function(row) {
                row.should.be.eql(['google', 'blah','me'])
            }))
            .pipe(assert.end(done))
    })
})