var through2 = require('through2'),
    _ = require('lodash')

module.exports = function(selectedFieldNames, transformFunc) {

    var first = true

    return new through2.obj(function($row, enc, callback) {
        
        //If it's the first row and we have a header row, then skip it
        if ($row.meta.headerRow && first){
            callback(null, $row)
            first = false
        }else{
        	if (!_.isArray(selectedFieldNames)) {
            	selectedFieldNames = [selectedFieldNames]
            }
            selectedFieldNames.forEach(function(name) {
                var columnId = _.indexOf($row.meta.fields, name)
                if (columnId >= 0){
                    $row.data[columnId] = transformFunc($row.data[columnId])
                }
            })
            callback(null, $row)
        }
    })
}