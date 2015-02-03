var csv = require('csv'),
	fs = require('fs')

var refine = require('../lib/v2')
var select = refine.select
var transform = refine.transform

fs.createReadStream('../data/colorado5.csv')
	.pipe(csv.parse())
	.pipe(refine.start())
    .pipe(select.fields(['NAME'], transform.uppercase()))
    .pipe(refine.end())
    .pipe(refine.print())