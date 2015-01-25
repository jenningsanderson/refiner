var through2 = require('through2')

module.exports = function(srcPattern, destPattern) {
   
    return new through2.obj(function(row, enc, callback) {

		for(var i=0; i<row.length; i++)
			if (row[i].toString() === srcPattern.toString())
			//if(row[i] == srcPattern)
				row[i] = destPattern
        
		  this.push(row)
        callback()
    })
}
