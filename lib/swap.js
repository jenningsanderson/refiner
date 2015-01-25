var through2 = require('through2')

module.exports = function(srcColumnId, destColumnId) {
   
    return new through2.obj(function(row, enc, callback) {
        
		  var temp = row[srcColumnId-1]
		  row[srcColumnId-1] = row[destColumnId-1]
		  row[destColumnId-1] = temp

		  this.push(row)
        callback()
    })
}
