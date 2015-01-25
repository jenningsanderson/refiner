var through2 = require('through2')

//
// take the value in the column as a search string
// search google
// replace the string by the url of the first result
//
// API key: AIzaSyBxr_9xqAMNJql_NCMxILJxXJIlHuCFGv0
// https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures

module.exports = function(columnId) {   
    
    return new through2.obj(function(row, enc, callback) {
        
       // console.log('test')
        console.log(row[columnId])

    	var xmlHttp = null;
	    xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyBxr_9xqAMNJql_NCMxILJxXJIlHuCFGv0&q="+row[columnId], false );
	    //xmlHttp.send( null );
	    console.log(  xmlHttp.responseText )


       // this.push(row)
        callback()
    })
}