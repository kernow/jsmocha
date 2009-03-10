// TODO move this to a better place
// TODO better reporting of complex objects for parameters matcher
object_to_array = function(o) {
	var a = new Array();
	for(var i = 0; i < o.length; i++){
		a.push(o[i]);
	}
	return a;
}
