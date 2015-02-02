var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')()

var refine = require('../lib/v2')
var transform = refine.transform
var select = refine.select

describe('replace', function() {

    it('should replace the sourcePattern with the Destination Pattern for a specific column', function(done) {

        streamify([
            ['google', 'b', 'c']
        ])
            .pipe(refine.start())
            .pipe(select.cols(0, transform.replace('g','n')))
            .pipe(refine.end())
            
            .pipe(assert.first(function(row) {
                row.should.be.eql(['noonle', 'b', 'c'])
            }))
            .pipe(assert.end(done))

    })

    it('should replace the sourcePattern with the Destination Pattern for all values in a row', function(done) {

        streamify([
            ['google', 'gattaca', 'rugging.js']
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.replace('g','n')))
            .pipe(refine.end())
            
            .pipe(assert.first(function(row) {
                row.should.be.eql(['noonle', 'nattaca', 'runninn.js'])
            }))
            .pipe(assert.end(done))

    })


})