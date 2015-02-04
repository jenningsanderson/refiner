var through2 = require('through2')

// print each row to console, if a columnId is given, print only that column
module.exports = function(columnId) {

    return new through2.obj(function(row, enc, callback) {
        if (columnId=='viz') {
        	console.log(row.join(''))
        }else if (columnId) {
            console.log(row[columnId])
        }else{
            console.log(row.join(','))
        }
        callback(null, row)
    })
}