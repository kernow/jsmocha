// TODO move this to a better place
object_to_array = function(o) {
	var a = new Array();
	for(var i = 0; i < o.length; i++){
		a.push(o[i]);
	}
	return a;
}

Object.prototype.getName = function() { 
   var funcNameRegex = /function (.{1,})\(/;
   var results = (funcNameRegex).exec((this).constructor.toString());
   return (results && results.length > 1) ? results[1] : "";
};
