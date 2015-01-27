var through2 = require('through2')

module.exports = function(n) {

    return new through2.obj(function(row, enc, callback) {

		row[n] = row[n].toString().toLowerCase()

		this.push(row)
		callback()
    })
}
