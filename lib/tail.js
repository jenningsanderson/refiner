var through2 = require('through2')

////////////// TAIL  ///////////////
//
// pushes only the last n values in the stream
//
//

module.exports = function(n) {

	var count = 0
	var to_keep = []

	return new through2.obj(
    	function (row, enc, cb) { 
    		to_keep.push(row)
    		count += 1
    		if (count > n){
    			to_keep.shift()
    		}
    		cb() 
    	},
    	// The flush function (passed as a second argument, made for cleaning this up...)
    	function (cb) {
      		for (i in to_keep){
      			this.push(to_keep[i])
      		}
      		cb();
		}
  	)
}