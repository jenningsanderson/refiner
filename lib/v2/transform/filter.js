module.exports = function(pattern) {

    return function(cell) {
        if ( (new RegExp(pattern)).test(cell.toString()) ) {
        	return cell
        }else{
        	return '---'
        }
    }
}