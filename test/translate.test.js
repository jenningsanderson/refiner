var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')()

var refine = require('../lib/v2')
var transform = refine.transform
var select = refine.select

describe('translate', function() {
    this.timeout(5000);

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

	it('should translate everything translated, fails because of api restrictions', function(done){
        streamify([
            ['Hello world', 'mom']
        ])
            .pipe(refine.start())
            .pipe(select.all(transform.translate('en', 'fr')))
            .pipe(refine.end())

            .pipe(assert.first(function(row) {
                row.should.be.eql(['Bonjour tout le monde', 'maman'])
            }))
            .pipe(assert.end(done))
		
	})

})
