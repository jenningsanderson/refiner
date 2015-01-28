var through2 = require('through2')

//
// remove([2,5])
// 
// pass a row downstream after removing the selected columns (e.g., 2nd, 5th)
//
module.exports = function(columnIds) {
  

    return new through2.obj(function(row, enc, callback) {
		if (columnIds instanceof(Array)){
			columnIds.sort()
			for (var i=columnIds.length-1; i>=0; i--){
    			row.splice(columnIds[i],1);
    		}
    	}else{
    		row.splice(columnIds, 1)
    	}
        this.push(row)
        callback()
    })
}
