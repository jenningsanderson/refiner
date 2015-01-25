//http://www.frengly.com/#/api

var through2 = require('through2')

module.exports = function(columnId, srcLanguage, destLanguage) {   
    return new through2.obj(function(row, enc, callback) {

		var text = row[columnId-1]
		
		//for authentication
		var email = "jeeeun.kim@colorado.edu"
		var passwd = "akf493"

		//var url = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate?oncomplete=doneCallback&appId=MyAppID&from=" + srcLanguage + "&to=" + destLanguage + "&text=" + text"

		var url = "http://syslang.com?src=" + srcLanguage + "&dest=" + destLanguage + "&text=" + text + "&email=" + email + "&password=" + passwd
		
		
		this.push(row)
      callback()
    })
}
