var through2 = require('through2'),
    request = require('request')

//
// take the value in the column as a city's name to lookup
// the sunrise time using the open weather API
//

module.exports = function(columnId) {

    return new through2.obj(function(row, enc, callback) {

        var city = row[columnId-1]
        var firstWord = city.split(' ')[0]

        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + firstWord
        console.log(url)
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {


                // Example result:

                // { coord: { lon: 120.32, lat: -8.56 },
                //   sys: 
                //    { message: 0.1002,
                //      country: 'Indonesia',
                //      sunrise: 1421790831,
                //      sunset: 1421835969 },
                //   weather: 
                //    [ { id: 801,
                //        main: 'Clouds',
                //        description: 'few clouds',
                //        icon: '02n' } ],
                //   base: 'cmc stations',
                //   main: 
                //    { temp: 294.449,
                //      temp_min: 294.449,
                //      temp_max: 294.449,
                //      pressure: 982.33,
                //      sea_level: 1024.99,
                //      grnd_level: 982.33,
                //      humidity: 100 },
                //   wind: { speed: 1.3, deg: 220.501 },
                //   clouds: { all: 20 },
                //   dt: 1421875126,
                //   id: 1629380,
                //   name: 'Kuwus',
                //   cod: 200 }             

                var result = JSON.parse(body)
                if (result.sys) {
                    row[columnId-1] = result.sys.sunrise
					}
            }else{
                console.log(error)
            }

            // this is equivalent to push(chunk); call()
            callback(null, row)
        })

    })
}
