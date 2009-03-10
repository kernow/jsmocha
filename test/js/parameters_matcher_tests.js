
jsMochaTests.ParametersMatcherTests = function(Y) {
	var testSuite = new Y.Test.Suite();

	testSuite.add(new Y.Test.Case({
		name: "Parameters Matcher",
		testSomething : function () { 
			Y.Assert.isTrue(true, 'yep');
		},
		testSomethingElse : function () { 
			Y.Assert.isTrue(false, 'nope');
		} 
	}));
	return testSuite;
};
