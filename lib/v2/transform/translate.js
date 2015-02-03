//http://www.frengly.com/#/api

var request	= require('request')
var requestSync	= require('sync-requrest')

module.exports = function() {   

	return function(cell){
		
		//for authentication
		var email = "jeeeun.kim@colorado.edu"
		var passwd = "akf493"

		var queryString = "http://syslang.com?src=" + srcLanguage + "&dest=" + destLanguage + "&text=" + cell.toString() + "&email=" + email + "&password=" + passwd + "&outformat=json"

		var res = requrestSync('GET', queryString);
			if(res.statusCode == 200){
//console.log(body);
				var body = JSON.parse(res.getBody('utf-8'))
				if(body){
					return new body.translation
				} else {
					return cell
					console.log("The response is not json format")
				}
			}
    }
}
