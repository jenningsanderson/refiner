var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')()

var refine = require('../lib/v2')
var transform = refine.transform
var select = refine.select

describe('translate', function() {

    it('should change the text in a cell to translated language', function(done) {

        streamify([
            ['Hello world', 'b', 'c']
        ])
            .pipe(refine.start())
            .pipe(select.cols(0, transform.translate('en', 'fr')))
            .pipe(refine.end())

            .pipe(assert.first(function(row) {
                row.should.be.eql(['Bonjour tout le monde', 'b', 'c'])
            }))
            .pipe(assert.end(done))

    })


})
