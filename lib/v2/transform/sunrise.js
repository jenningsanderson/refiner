var through2    = require('through2'),
    requestSync = require('sync-request')

//
// take the value in the column as a city's name to lookup
// the sunrise time using the open weather API
//

module.exports = function(columnId) {

    return function(cell){
        var city = cell.toString()
        city = city.replace(/(CDP)/,'')
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city
        var res = requestSync('GET', url);
        if (res.statusCode == 200) {
            var resJSON = JSON.parse(res.getBody('utf-8'))
            if (resJSON.sys){ return new Date(resJSON.sys.sunrise*1000)}
        }
        return cell
    }
}

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
