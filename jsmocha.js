// TODO move this to a better place
object_to_array = function(o) {
	var a = new Array();
	for(var i = 0; i < o.length; i++){
		a.push(o[i]);
	}
	return a;
}
