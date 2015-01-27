var through2 = require('through2')
//
// copy the content of column 'src' and insert right before column 'dest'
// in otehr words, the copy will become the new column 'dest'
//
// copy(2)
//
// before: [0,1,2,3,4,5,6]
//
// after:  [0,1,2,3,3,4,5,6]
//
module.exports = function(src) {

	return new through2.obj(function(row, enc, callback) {
	
		for(var i=row.length; i>=src; i--){
			row[i] = row[i-1];
//console.log(row[i]);
		}
		this.push(row)
		callback()
    })
}
