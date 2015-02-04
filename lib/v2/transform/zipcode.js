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
    		key: 'QtmbcZjylztKdmaadfMbRpxPfxY9hwn70KjcJCK5beQpA1zOgl08LxX04Waltxtt',
    		format: 'json'
    	};
    	var cityName = cell.toString()
    	console.log(cityName)
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
		console.log(url)
		var res = requestSync('GET', url);
		if (res.statusCode == 200) {
			var resJSON = JSON.parse(res.getBody('utf-8'))
			return resJSON.items[0].link
		}
	}
}