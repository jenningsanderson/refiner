var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')

var refine = require('../lib')

describe('refine', function() {

    describe('skipfirst()', function() {
        it('should skip the first row', function(done) {

            streamify([
                [1, 1, 1],
                [2, 2, 2]
            ])
                .pipe(refine.skipfirst())
                .pipe(assert.first(function(data) {
                    data.should.be.eql([2, 2, 2])
                }))
                .pipe(assert.length(1))
                .pipe(assert.end(done))

        })
    }),

    describe('head', function() {
        it('head(2) should pass through the first two rows', function(done) {

            streamify([
                [1, 1, 1],
                [2, 2, 2],
                [3, 3, 3]
            ])
                .pipe(refine.head(2))
                .pipe(assert.first(function(data) {
                    data.should.be.eql([1, 1, 1])
                }))
                .pipe(assert.second(function(data) {
                    data.should.be.eql([2, 2, 2])
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))

        })
    })

    describe('tail', function() {
        it('tail(2) should pass through the last two rows', function(done) {

            streamify([
                [1, 1, 1],
                [2, 2, 2],
                [3, 3, 3]
            ])
                .pipe(refine.tail(2))
                .pipe(assert.first(function(data) {
                    data.should.be.eql([2, 2, 2])
                }))
                .pipe(assert.second(function(data) {
                    data.should.be.eql([3, 3, 3])
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))

        })
    })

    describe('swap', function() {
        it('swap(1,2) should swap two columns', function(done) {

            streamify([
                [0, 1, 2, 3],
                [0, 1, 2, 3]
            ])
                .pipe(refine.swap(1, 2))
                .pipe(assert.all(function(data) {
                    data.should.be.eql([0, 2, 1, 3])
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))

        })
    })

    describe('remove', function() {
        it('remove(1) should remove column 1', function(done) {

            streamify([
                [0, 1, 2, 3],
                [0, 1, 2, 3]
            ])
                .pipe(refine.remove(1))
                .pipe(assert.all(function(data) {
                    data.should.be.eql([0, 2, 3])
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))
        })
    })

    describe('lowercase', function(){
         it("should make all the text in the desired columnId (lowercase(9) lowercase.", function(done){
            
            streamify([
                [0, 1, "ALL CAPITAL LETTERS", 3],
                [0, 1, "some CAPITAL leTTers", 3]
            ])

                .pipe(refine.lowercase(2))

                .pipe(assert.all(function(data) {
                    data[2].should.match(/\a*|\s*/)
                }))
                .pipe(assert.end(done))
         })
    })

    describe('copy', function() {
        it('copy(1,2) should copy column 1 to column 2', function(done) {

            streamify([
                [0, 1, 2, 3],
                [0, 1, 2, 3]
            ])
                .pipe(refine.copy(1,2))
                .pipe(assert.all(function(data) {
                    data.should.be.eql([0, 1, 1, 2, 3])
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))

        })
    })    

    describe('threshold', function() {
        it('threshold(1,20) should keep only rows whose value at column 1 is >= 20', function(done) {

            streamify([
                [0, 5, 2, 3],	
                [0, 25, 2, 3],	// only this should remain
                [0, 3, 2, 3]	
            ])
                .pipe(refine.threshold(1, 20))
                .pipe(assert.all(function(data) {
                    data[1].should.not.be.below(20)
                }))
                .pipe(assert.length(1))
                .pipe(assert.end(done))

        })
    })

    describe('translate', function() {
        it('should translate text', function(done) {

            streamify([
                ["Hello, my name is Bob"]   
            ])
                .pipe(refine.translate(0,'en','es'))
                .pipe(assert.all(function(data) {
                    data[0].should.match(/Hola, me llamo Bob/)
                }))
                .pipe(assert.end(done))
        })
    })



    describe('filter', function() {
        it('filter(1,/^a/) should keep only rows whose value at column 1 begins with the letter a', function(done) {

            streamify([
                [0, 'bat', 2, 3],	
                [0, 'adam', 2, 3],	// this should remain
                [0, 'alex', 2, 3]	// this too
            ])
                .pipe(refine.filter(1, "^a"))
                .pipe(assert.all(function(data) {
                    data[1][0].should.be.equal('a')
                }))
                .pipe(assert.length(2))
                .pipe(assert.end(done))

        })
    })

    describe('replace', function() {
        it('replace("a","bb") should replace all a\'s with bb\'s', function(done) {

            streamify([
                [0, 'bat', 2, 3],	
                [0, 'bat', 2, 3],	
                [0, 'bat', 2, 3]
            ])
                .pipe(refine.replace('a', 'bb'))
                .pipe(assert.all(function(data) {
                    data[1].should.be.equal('bbbt')
                }))
                .pipe(assert.length(3))
                .pipe(assert.end(done))

        })
    })    

    describe('sunrise', function() {
        it('sunrise(1) should replace a ctiy name at column 1 with the city\'s sunrise time', function(done) {

            streamify([
                [0, 'denver', 2, 3],
                [0, 'boulder', 2, 3]                
            ])
                .pipe(refine.sunrise(1, 2))
                .pipe(assert.first(function(data) {
                    data[1].should.not.be.equal('denver')
                    data[1].should.be.above(1421000000)
                }))
                .pipe(assert.second(function(data) {
                    data[1].should.not.be.equal('boulder')
                    data[1].should.be.above(1421000000)
                }))
                .pipe(assert.end(done))

        })
    })

    describe('search', function() {
        it('should take a columnId and replace the value at that id with the first link returned in a google search on the column contents', function(done) {

            streamify([
                [0, 'denver', 2, 3],
                [0, 'boulder', 2, 3]                
            ])
                .pipe(refine.search(1))
                
                .pipe(assert.first(function(data) {
                    data[1].should.match(/^http:/)
                }))
                .pipe(assert.second(function(data) {
                     data[1].should.match(/^http:/)
                }))
                .pipe(assert.end(done))

        })
    })


})