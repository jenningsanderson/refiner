//http://www.frengly.com/#/api

var through2 = require('through2')
var request	= require('request')

module.exports = function(columnId, srcLanguage, destLanguage) {   
    return new through2.obj(function(row, enc, callback) {

		var text = row[columnId-1]
		
		//for authentication
		var email = "jeeeun.kim@colorado.edu"
		var passwd = "akf493"

		var url = "http://syslang.com?src=" + srcLanguage + "&dest=" + destLanguage + "&text=" + text + "&email=" + email + "&password=" + passwd + "&outformat=json"


		//console.log(url);
		request(url, function(err, res, body){
			if(!err && res.statusCode == 200){

		//		Example result:
		//		{ "text":"Bonjour monsieur",
		//			"dest":"en",
		//			"translation":"Hello sir",
		//			"action":"translateREST",
		//			"src":"fr"
		//		}
				
				
				console.log(body) //this API doesn't have full translation set
				if(body[0] != '<'){ 
					var result = JSON.parse(body)
				
					if(result.translation){
						//console.log(result.translation)
						row[columnId-1] = result.translation
					}
				}
			} else {
				console.log(err)
			}
		})

		this.push(row)
      callback()
    })
}
