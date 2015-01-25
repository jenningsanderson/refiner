var through2 = require('through2')
//
// copy the content of column 'src' and insert right before column 'dest'
// in otehr words, the copy will become the new column 'dest'
//
// copy(2)
//
// before: [0,1,2,3,4,5,6]
//
// after:  [0,1,2,3,4,5,6,3]
//
module.exports = function(src) {

	return new through2.obj(function(row, enc, callback) {
	
		row[row.length] = row[src-1];

		this.push(row)
		callback()
    })
}
