//http://www.frengly.com/#/api

var request	= require('request')
var requestSync	= require('sync-request')

module.exports = function(srcLang, destLang) {   

	return function(cell){
		
		//for authentication
		var email = "jeeeun.kim@colorado.edu"
		var passwd = "akf493"

		var queryString = "http://syslang.com?src=" + srcLang + "&dest=" + destLang + "&text=" + cell.toString() + "&email=" + email + "&password=" + passwd + "&outformat=json"

		var res = requestSync('GET', queryString);
			if(res.statusCode == 200){
				
				var body = JSON.parse(res.getBody('utf-8'))
				if(body){
					return body.translation
				} else {
					console.log("The response is empty")
					return cell
				}
			}
    }
}
