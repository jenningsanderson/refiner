var through2 = require('through2')
//
// pass rows matching the given pattern downstrem at the given column
//
module.exports = function(columnId, pattern) {

	if (pattern[0]=='/'){
		var re = new RegExp(pattern.substring(1, pattern.length-1))
	}else{
		var re = new RegExp(pattern)
	}
	
    return new through2.obj(function(row, enc, callback) {
    	if (re.test(row[columnId])){
    		this.push(row)
    	}
    	callback()
    })
}