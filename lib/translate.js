//http://www.frengly.com/#/api

var through2 = require('through2')
var request	= require('request')

module.exports = function(columnId, srcLanguage, destLanguage) {   
    return new through2.obj(function(row, enc, callback) {

		var text = row[columnId]
		
		//for authentication
		var email = "jeeeun.kim@colorado.edu"
		var passwd = "akf493"

		var url = "http://syslang.com?src=" + srcLanguage + "&dest=" + destLanguage + "&text=" + text + "&email=" + email + "&password=" + passwd + "&outformat=json"

		request(url, {json:true}, function(err, res, body){
			if(!err && res.statusCode == 200){

				row[columnId] = body.translation
				callback(null, row)
			}else{
				console.log(err)
				callback(null, row)
			}
		})
    })
}