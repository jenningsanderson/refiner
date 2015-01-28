var through2 = require('through2')

// Only keep the row if the value at columnId is above the threshold value.
//

module.exports = function(columnId, threshold) {

	return new through2.obj(function(row, enc, callback) {
		if (row[columnId] >= threshold){
			this.push(row)
		}
		callback()
    })
}
