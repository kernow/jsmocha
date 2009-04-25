
jsMochaTests.ExpectationListTests = function(Y) {
	var testSuite = new Y.Test.Suite();

	testSuite.add(new Y.Test.Case({
		
		name: "Expectation List",
		
		setUp : function () {
			this.expectation_list = new jsMocha.ExpectationList();
			this.mock = new Mock();
			this.expectation1 = new jsMocha.Expectation(mock.jsmocha, 'a_method');
			this.expectation2 = new jsMocha.Expectation(mock.jsmocha, 'another_method');
		},
		
		tearDown : function () { 
			delete this.expectation_list;
			delete this.mock;
			delete this.expectation1;
			delete this.expectation2;
		},
		
		testHasArray : function () {
			Y.Assert.isArray(this.expectation_list.expectations);
		},
		
		testCanAddExpectations : function () {
			this.expectation_list.add(this.expectation1);
			Y.Assert.areEqual(1, this.expectation_list.expectations.length);
			
			this.expectation_list.add(this.expectation2);
			Y.Assert.areEqual(2, this.expectation_list.expectations.length);
		},
		
		testCanVerifyAllExpectations : function () {
			var mock_obj = new Mock();
			mock_obj.expects('a_method');
			mock_obj.a_method();
			Y.Assert.isTrue(mock_obj.jsmocha.verify());
		},
		
		testCanCheckAllExpectations : function () {
			var mock_obj = new Mock();
			mock_obj.expects('a_method');
			Y.Assert.isTrue(mock_obj.jsmocha.expectations.all_passed([true,true,true]));
			Y.Assert.isTrue(mock_obj.jsmocha.expectations.all_passed([true]));
			Y.Assert.isFalse(mock_obj.jsmocha.expectations.all_passed([true,false,true]));
			Y.Assert.isFalse(mock_obj.jsmocha.expectations.all_passed([false]));
		},
		
		testCanGetInvocationReport : function () {
			this.mock.expects('a_method');
			mock.jsmocha.verify();
			var expected_fail_str = "\r\nobject: Object.a_method\r\nFAIL wrong number of invocations, expected exactly once invoked no times";
			Y.Assert.areEqual(expected_fail_str, this.mock.jsmocha.expectations.reports());
			this.mock.a_method();
			mock.jsmocha.verify();
			var expected_pass_str = "\r\nobject: Object.a_method\r\nPASS expected exactly once invoked once";
			Y.Assert.areEqual(expected_pass_str, this.mock.jsmocha.expectations.reports());
		},
		
		testCanGetParametersFailReport : function () {
			this.mock.expects('a_method').passing('a string');
			mock.jsmocha.verify();
			var expected_fail_str = "\r\nobject: Object.a_method";
			expected_fail_str	 += "\r\nFAIL wrong number of invocations, expected exactly once invoked no times";
			expected_fail_str	 += "\r\nFAIL expected (\"a string\") but got (undefined)";
			Y.Assert.areEqual(expected_fail_str, this.mock.jsmocha.expectations.reports());
			this.mock.a_method();
			mock.jsmocha.verify();
			var expected_pass_str = "\r\nobject: Object.a_method";
			expected_pass_str	 += "\r\nPASS expected exactly once invoked once";
			expected_pass_str	 += "\r\nFAIL expected (\"a string\") but got ()";
			Y.Assert.areEqual(expected_pass_str, this.mock.jsmocha.expectations.reports());
		},
		
		testCanGetParametersPassReport : function () {
			this.mock.expects('a_method').passing('a string');
			this.mock.a_method('a string');
			mock.jsmocha.verify();
			var expected_pass_str = "\r\nobject: Object.a_method";
			expected_pass_str	 += "\r\nPASS expected exactly once invoked once";
			Y.Assert.areEqual(expected_pass_str, this.mock.jsmocha.expectations.reports());
		}
		
	}));
	
	return testSuite;
};