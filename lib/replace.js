var through2 = require('through2')

module.exports = function(srcPattern, destPattern) {
   
	if (srcPattern[0]=='/'){
		var re = new RegExp(srcPattern.substring(1, pattern.length-1))
	}else{
		var re = new RegExp(srcPattern)
	}
	
    return new through2.obj(function(row, enc, callback) {

		for (var i=0; i<row.length; i++){
			row[i] = row[i].toString().replace(re, destPattern)
		}
        
		this.push(row)
        callback()
    })
}
