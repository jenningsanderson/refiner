var through2 = require('through2')

module.exports = function(columnId) {

	var sortedIndexes = []
	var data = []

	var dataIndex = 0

    return new through2.obj(function(row, enc, callback) {

    	if (!row[columnId].toString().match(/\d+/) ){throw new Error("I can't sort strings or decimals yet")}

		data[dataIndex] = row

		if (sortedIndexes[ row[columnId] ] == undefined){
			sortedIndexes[ row[columnId] ] = dataIndex
		}else{
			sortedIndexes.splice(row[columnId], 0, dataIndex)
		}
		dataIndex+=1
		callback()
    },

    function(cb){	//flush function which will now sort the values
    	for (index in sortedIndexes){
    		if (sortedIndexes[index] != undefined){
    			this.push(data[sortedIndexes[index]])
    		}
    	}
    	cb()
    })
}
