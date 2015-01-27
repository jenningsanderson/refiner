var through2 = require('through2')

////////////// TAIL  ///////////////
//
// pushes only the last n values in the stream
//

module.exports = function(n) {

    var count = 0

    to_keep = []

    return new through2.obj(function(row, enc, callback) {

    	to_keep.push(row)

        callback()
    })
}