var csv = require('csv'),
	fs = require('fs')

var refine = require('../lib')

fs.createReadStream('../data/colorado.csv')
	.pipe(csv.parse())
	.pipe(refine.zipcode(8))
	.pipe(refine.print())
