
jsMochaTests.ExpectationTests = function(Y) {
	var testSuite = new Y.Test.Suite();

	testSuite.add(new Y.Test.Case({
		
		name: "Expectation non prototype",
		
		setUp : function () {
			function AnObject(){
				this.a_method = function(){
					return('original method');
				};
			};
			this.obj = new AnObject();
			this.expectation = new Expectation(this.obj, 'a_method');
		},
		
		tearDown : function () { 
			delete this.obj;
		},
		
		testShouldReplaceOriginalMethod : function () {
			Y.Assert.areNotEqual('original method', this.obj.a_method());
		},
		
		testShouldPassInvocationVerification : function () {
			this.obj.a_method();
			Y.Assert.isTrue(this.expectation.verify());
		},
		
		testShouldPassParamsVerification : function () {
			this.expectation.with('string');
			this.obj.a_method('string');
			Y.Assert.isTrue(this.expectation.verify());
		},
		
		testShouldFailInvocationVerification : function () {
			Y.Assert.isFalse(this.expectation.verify());
		},
		
		testShouldFailParamsVerification : function () {
			this.expectation.with('string');
			this.obj.a_method('string 2');
			Y.Assert.isFalse(this.expectation.verify());
		},

		testInvocationVerificationReport : function () {
			this.expectation.verify();
			var report_string = "object: AnObject.a_method";
			report_string	 += "\r\nFAIL wrong number of invocations, expected 1 invoked 0 times";
			Y.Assert.areEqual(report_string, this.expectation.report());
		},
		
		testShouldFailParamsVerification : function () {
			this.expectation.with('string');
			this.obj.a_method('string 2');
			this.expectation.verify();
			var report_string = "object: AnObject.a_method";
			report_string	 += "\r\nPASS invoked 1 times";
			report_string	 += "\r\nFAIL expected (string) but got (string 2)";
			Y.Assert.areEqual(report_string, this.expectation.report());
		},
	}));
	return testSuite;
};
	