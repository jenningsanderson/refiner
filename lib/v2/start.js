var through2 = require('through2')

module.exports = function(meta) {

	first = true
    
    return new through2.obj(function(row, enc, callback) {
    	meta = meta || {} //Initialize meta, or check for existing
        
        // Check if fields was given in the meta
        if (meta.fields){
            meta.headerRow = false
        }

        // Fields was not given in the meta
        else{
            //If it's the first row, then set this as the headers
            if (first){
                meta.fields = row
                meta.headerRow = true
                first = false
            }
        }
    	
        var $row = {data: row, meta: meta}   
        callback(null, $row)
    })
}