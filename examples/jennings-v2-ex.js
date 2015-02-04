var csv = require('csv'),
	fs = require('fs')

var refine = require('../lib/v2')
var select = refine.select
var transform = refine.transform
var viz = refine.viz

fs.createReadStream('../data/colorado5.csv')
	.pipe(csv.parse())
	.pipe(refine.start())
	//.pipe(select.fields(["NAME"], transform.uppercase()))
    .pipe(select.fields(["NAME"], transform.search()))
    .pipe(refine.end())
    //.pipe(viz.htmltable())
    //.pipe(refine.print('viz'))
    .pipe(refine.print())