module.exports = function(srcPattern, destPattern) {

    return function(cell) {
    	//Adding logic to replace all instances.
        return cell.replace(new RegExp(srcPattern, 'g'), destPattern)
    }
}