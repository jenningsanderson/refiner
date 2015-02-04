var through2 = require('through2')

// print each row to console, if a columnId is given, print only that column
module.exports = function() {
    return new through2.obj(function(row, enc, callback) {
        var line = ['<tr>'];
        var arrayLength = row.length;
        row.forEach(function(x){
        	line.push('<td>' + x + '</td>');
        });
        line.push('</tr>');
        callback(null, line);
    }
    // ,
    // function(row, enc, callback) {
    //     this.push('</table>');
    // }
    )
}