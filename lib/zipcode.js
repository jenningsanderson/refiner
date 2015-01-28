var through2 = require('through2')
var request = require('request')
module.exports = function(columnId) {

    return new through2.obj(function(row, enc, callback) {
    	// Use the service from zipcodeapi.com to find zip codes for cities.
    	// example: http://www.zipcodeapi.com/rest/key/city-zips.json/Denver/CO
    	var options = {
    		hostname: 'http://www.zipcodeapi.com/',
    		port: 80,
    		path1: 'rest/',
    		path2: 'city-zips.',
    		key: 'QtmbcZjylztKdmaadfMbRpxPfxY9hwn70KjcJCK5beQpA1zOgl08LxX04Waltxtt',
    		format: 'json'
    	};
    	var cityName = row[columnId]
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
    	console.log("Find all ZIP codes for " + cityName)
    	// send HTTP GET request
    	var url = options['hostname'] + options['path1'] + options['key'] + '/'
    	          + options['path2'] + options['format']
    	          + '/' + cityName + '/' + state
    	var req = request(url, {json:true}, function (err, res, body) {
			if (!err && res.statusCode == 200) {
				zip_codes = '"' + body.zip_codes.join() + '"'
				if(zip_codes != null && zip_codes.length > 2){
					// replace column name
					console.log('Zip codes for ' + cityName + ': ' + zip_codes)
					console.log(zip_codes.length)
					row[columnId] = zip_codes
				}
				else{
					zip_codes = ''
					console.log("No zip code for " + cityName)
				}
			}
			else{
				console.log('Error: ' + err)
			}
			callback(err, row)
		});
		req.end()
    })
}
