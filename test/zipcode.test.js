var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')()

var refine = require('../lib/v2')
var transform = refine.transform
var select = refine.select

describe('zipcode', function() {
    this.timeout(5000);

    it('should change the text in a cell to a list of zipcodes', function(done) {

        streamify([
            ['Louisville']
        ])
            .pipe(refine.start({fields: ['NAME', 'blank','blank']}))
            .pipe(select.fields('NAME', transform.zipcode()))
            .pipe(refine.end())

            .pipe(assert.first(function(row) {
                row[0].should.be.eql(['80027', '80028'])
            }))
            .pipe(assert.end(done))

    })


})