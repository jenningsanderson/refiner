var through2 = require('through2')

module.exports = function(meta) {
	first = true
    return new through2.obj(function(row, enc, callback) {
    	meta = meta || {}
    	if (first){
    		meta.fields = row
    		first = false
    	}
        var $row = {data: row, meta: meta}   
        callback(null, $row)
    })
}