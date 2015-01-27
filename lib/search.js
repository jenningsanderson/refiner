var through2 = require('through2')
// var https = require('https')
var request = require('request')

// THERE IS A LIMIT OF 100 REQUESTS PER DAY, USE SPARINGLY!
// take the value in the column as a search string
// search google
// replace the string by the url of the first result
//
// API key: AIzaSyBxr_9xqAMNJql_NCMxILJxXJIlHuCFGv0
// https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures

module.exports = function(columnId) {   
    
	var new_rows = []

    return new through2.obj(function(row, enc, callback) {

        var query_string = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBxr_9xqAMNJql_NCMxILJxXJIlHuCFGv0&cx=001519288170159285104:bqnnere45wk&q="+row[columnId]
        
		request(query_string, {json:true}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				row[columnId] = body.items[0].link
				callback(error, row)
			}
		})
    })
}