
jsMochaTests.StubTests = function(Y) {
	var testSuite = new Y.Test.Suite("Stub");



	testSuite.add(new Y.Test.Case({
		
		name: "general",
		
		setUp : function () {
			this.mock = new Mock();
		},
		
		tearDown : function () { 
			delete this.mock;
		},
		
		testShouldHaveStubsMethod : function () {
			Y.Assert.isFunction(this.mock.stubs);
		},
		
		testVerifyAlwaysReturnsTrue : function () {
		  this.mock.stubs('a_method');
		  Y.Assert.isTrue(this.mock.jsmocha.verify());
		  this.mock.a_method();
		  Y.Assert.isTrue(this.mock.jsmocha.verify());
		  this.mock.a_method('with params');
		  Y.Assert.isTrue(this.mock.jsmocha.verify());
		  this.mock.a_method('with other params');
		  Y.Assert.isTrue(this.mock.jsmocha.verify());
		},
		
		testCanReturnData : function () {
		  this.mock.stubs('a_method').returns(1,2,3);
		  Y.Assert.areEqual(1, this.mock.a_method());
		  Y.Assert.areEqual(2, this.mock.a_method());
		  Y.Assert.areEqual(3, this.mock.a_method());
		  Y.Assert.areEqual(3, this.mock.a_method());
		}
	}));
	
	testSuite.add(new Y.Test.Case({
		
		name: "reporting",
		
		setUp : function () {
			this.mock = new Mock();
		},
		
		tearDown : function () { 
			delete this.mock;
		},
		
		testNoInvocations : function () {
      this.mock.stubs('a_method');
      this.mock.jsmocha.verify();
      var report_string = "\r\nobject: Object.a_method";
			report_string	 += "\r\nPASS allowed any number of times invoked no times";
      Y.Assert.areEqual(report_string, this.mock.jsmocha.report());
    },
    
    testOneInvocation : function () {
      this.mock.stubs('a_method');
      this.mock.a_method();
      this.mock.jsmocha.verify();
      var report_string = "\r\nobject: Object.a_method";
			report_string	 += "\r\nPASS allowed any number of times invoked once";
      Y.Assert.areEqual(report_string, this.mock.jsmocha.report());
    },
    
    testTwoInvocations : function () {
      this.mock.stubs('a_method');
      this.mock.a_method();
      this.mock.a_method();
      this.mock.jsmocha.verify();
      var report_string = "\r\nobject: Object.a_method";
			report_string	 += "\r\nPASS allowed any number of times invoked twice";
      Y.Assert.areEqual(report_string, this.mock.jsmocha.report());
    },
    
    testFiveInvocations : function () {
      this.mock.stubs('a_method');
      this.mock.a_method();
      this.mock.a_method();
      this.mock.a_method();
      this.mock.a_method();
      this.mock.a_method();
      this.mock.jsmocha.verify();
      var report_string = "\r\nobject: Object.a_method";
			report_string	 += "\r\nPASS allowed any number of times invoked 5 times";
      Y.Assert.areEqual(report_string, this.mock.jsmocha.report());
    }
		
	}));

	return testSuite;
};
