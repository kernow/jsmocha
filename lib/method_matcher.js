function MethodMatcher(method_name) {
	this[method_name] = function(){
		alert('function called with: '+arguments.length+' arguments');
	};
}