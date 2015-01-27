var csv = require('csv'),
	fs = require('fs')

var refine = require('../lib')

fs.createReadStream('../data/colorado5.csv')
	.pipe(csv.parse())
	
	.pipe(refine.tail(3))

//	.pipe(refine.filter(9,"/^G/"))
//	.pipe(refine.tail(3))
//	.pipe(refine.swap(0,8)) //test swap
	.pipe(refine.search(9))

//	.pipe(refine.lowercase(8))

//	.pipe(refine.uppercase(8))

//	.pipe(refine.remove([10,11,12,13,14,15]))

	// .pipe(refine.replace('Grover town', 'Jeeeun'))
	// .pipe(refine.replace('Air Force Academy CDP', 'Jennings'))
	// .pipe(refine.replace('6680', 'Khalid'))

	.pipe(refine.print())
