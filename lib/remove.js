var through2 = require('through2')

//
// remove([2,5])
// 
// pass a row downstream after removing the selected columns (e.g., 2nd, 5th)
//
module.exports = function(columnIds) {
   

    return new through2.obj(function(row, enc, callback) {
		var rowCnt = row.length
		
		for(var j=0; j<columnIds.length; j++){
			for(var i=columnIds[j]; i<rowCnt; i++){
				row[i] = row[i+1];
				rowCnt--;
			}
		}

        this.push(row)
        callback()
    })
}
