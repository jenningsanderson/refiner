var csv = require('csv'),
	fs = require('fs')


var refine = require('../lib')

fs.createReadStream('colorado.csv')
	.pipe(csv.parse())
//	.pipe(refine.swap(0,2)) //test swap

//	.pipe(refine.lowercase(9))

	.pipe(refine.uppercase(9))
	.pipe(refine.print())
