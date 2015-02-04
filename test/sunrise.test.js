var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')()

var refine = require('../lib/v2')
var transform = refine.transform
var select = refine.select

describe('sunrise', function() {
    this.timeout(5000);

    it('should lookup the sunrise time for a given city or town, given the name of the town', function(done) {

        streamify([
            ['Denver', 2, 3]
        ])
            .pipe(refine.start({fields: ['city', 'blank','blank']}))
            .pipe(select.fields('city', transform.sunrise()))
            .pipe(refine.end())

            .pipe(assert.first(function(row) {
                row[0].should.not.eql('Denver')
            }))
            .pipe(assert.end(done))
    })


})
