var csv = require('csv'),
	fs = require('fs')


var refine = require('../lib')

fs.createReadStream('../data/colorado5.csv')
	.pipe(csv.parse())
//	.pipe(refine.skipfirst())

//	.pipe(refine.sunrise(9))

//	.pipe(refine.swap(1,10)) //test swap

//	.pipe(refine.lowercase(10))

//	.pipe(refine.uppercase(10))

//	.pipe(refine.remove([10,11,12,13,14,15]))

//	.pipe(refine.replace('Grover town', 'Jeeeun'))
//	.pipe(refine.replace('Air Force Academy CDP', 'Jennings'))
//	.pipe(refine.replace('6680', 'Khalid'))

//	.pipe(refine.copy(1))
	
//	.pipe(refine.threshold(11,3000))

//	.pipe(refine.translate(9, 'en', 'ru'))
	
	.pipe(refine.removeRow(12,900))
	.pipe(refine.print())
