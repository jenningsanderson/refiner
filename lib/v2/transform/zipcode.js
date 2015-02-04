var requestSync = require('sync-request')
// Use the service from zipcodeapi.com to find zip codes for cities.
// example: http://www.zipcodeapi.com/rest/key/city-zips.json/Denver/CO

module.exports = function() {

	return function(cell){
		var options = {
    		hostname: 'http://www.zipcodeapi.com/',
    		port: 80,
    		path1: 'rest/',
    		path2: 'city-zips.',
    		key: 'bdSZG8bjT4wsJhHJXK64Kypew6K7Pdb0q3Z7cbr6gYz0fgJd0PhLoHZVNJ3CWeDn',
    		format: 'json'
    	};
    	var cityName = cell.toString()
    	var state = 'CO'
    	// Removed extra words from the city name
    	unwanted_words = ['town', 'city', 'CDP']
    	unwanted_words.forEach(function(w){
    		if (cityName.indexOf(w)> -1){
    			cityName = cityName.replace(w, '').trim()
    		}
    	});
    	var zip_codes = ''
    	cityName = encodeURIComponent(cityName)
    	// send HTTP GET request
    	var url = options.hostname + options.path1 + options.key + '/'
    	          + options.path2 + options.format
    	          + '/' + cityName + '/' + state
		var res = requestSync('GET', url);
		if (res.statusCode == 200) {
			var body = JSON.parse(res.getBody('utf-8'))
			zip_codes = body.zip_codes
		}
		else{
			console.log('Error code ' + res.statusCode + 
				', Message: ' + res.getBody('utf-8'))
		}
		return zip_codes
	}
}