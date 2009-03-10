
jsMochaTests.ExpectationTests = function(Y) {
	var testSuite = new Y.Test.Suite();

	testSuite.add(new Y.Test.Case({
		
		name: "Expectation non prototype",
		
		setUp : function () {
			function AnObject(){
				this.a_method = function(){
					alert('a_method called');
				};
			};
			this.obj = new AnObject();
		},
		
		tearDown : function () { 
			delete this.obj;
		},
		
		testShouldHaveExpectsMethod : function () {
			mock = new Mock(this.obj);
			Y.Assert.isFunction(mock.expects);
		}
	}));
	return testSuite;
};
	