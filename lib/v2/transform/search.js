var request = require('request')

// THERE IS A LIMIT OF 100 REQUESTS PER DAY, USE SPARINGLY!
// take the value in the column as a search string
// search google
// replace the string by the url of the first result
//
// API key: AIzaSyBxr_9xqAMNJql_NCMxILJxXJIlHuCFGv0
// https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures

module.exports = function() {

    return function(cell) {
    	var queryString = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBxr_9xqAMNJql_NCMxILJxXJIlHuCFGv0&cx=001519288170159285104:bqnnere45wk&q="+cell.toString()

		request(queryString, {json:true}, function (error, response, body) {
			console.log("anything!")
			if (error){throw error}
			if (response.statusCode == 200) {
				return body.items[0].link // But we never actually get into this function, why not?
			}
		})
    }
}