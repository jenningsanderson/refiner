module.exports = function(threshold) {
    return function(cell) {
        if (cell >= threshold){
        	return cell
        }else{
        	return 'FAIL'
        }
    }
}