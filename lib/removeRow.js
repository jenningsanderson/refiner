var through2 = require('through2')

//
// remove(10, 300)
// 
// pass a row downstream after removing row which is greater than the given value
//
module.exports = function(columnHead, threshold) {
  

    return new through2.obj(function(row, enc, callback) {
		
        if(row[columnHead] < threshold)
			callback()
    	else{
    		this.push(row)
            callback()
    	}
        
    })
}
