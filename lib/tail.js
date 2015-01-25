var through2 = require('through2')

////////////// TAIL  ///////////////
//
// pushes only the last n values in the stream
//

module.exports = function(n) {

    var count = 0

    return new through2.obj(function(row, enc, callback) {

        this.push(row)
        callback()
    })
}