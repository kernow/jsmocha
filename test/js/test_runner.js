/**
 * This is the test runner
**/
var jsMochaTests = {};
// Create new YUI instance, and populate it with the required modules
YUI({base: 'js/yui/build/'}).use("console", "yuitest", function(Y) {
	var yconsole = new Y.Console({
		newestOnTop: false                   
	});
	yconsole.render('#testLogger');
	Y.Test.Runner.add(jsMochaTests.CardinalityTests(Y));
	Y.Test.Runner.add(jsMochaTests.ExpectationCollectionTests(Y));
	Y.Test.Runner.add(jsMochaTests.ExpectationTests(Y));
	Y.Test.Runner.add(jsMochaTests.MockTests(Y));
	Y.Test.Runner.add(jsMochaTests.ParametersMatcherTests(Y));
	Y.Test.Runner.add(jsMochaTests.StubTests(Y));
	Y.Test.Runner.run();
});
