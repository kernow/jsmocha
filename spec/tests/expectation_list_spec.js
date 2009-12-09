Screw.Unit(function() {
  
  describe("jsMocha.ExpectationList", function() {
  
    var expectation_list;
    var mock;
    var expectation1;
    var expectation2;
  
    before(function(){
      expectation_list = new jsMocha.ExpectationList();
			mock = new Mock();
			expectation1 = new jsMocha.Expectation(mock.jsmocha, 'a_method');
			expectation2 = new jsMocha.Expectation(mock.jsmocha, 'another_method');
    });
    
    after(function(){
      expectation_list = null;
			mock = null;
			expectation1 = null;
			expectation2 = null;
    });
  
    it("should be an array", function(){
			expect(expectation_list.expectations).to(be_an_array);
    }); // end it
    
    it("should be able to add expectations", function(){
      expectation_list.add(expectation1);
      expect(expectation_list.expectations.length).to(equal, 1);
      expectation_list.add(expectation2);
      expect(expectation_list.expectations.length).to(equal, 2);
    }); // end it
    
    it("should be able to verify all expectations", function(){
      mock.expects('a_method');
      mock.a_method();
      expect(mock.jsmocha.verify()).to(be_true);
    }); // end it
    
    it("should be able to check all expectations", function(){
      mock.expects('a_method');
      expect(mock.jsmocha.expectations.all_passed([true,true,true])).to(be_true);
      expect(mock.jsmocha.expectations.all_passed([true])).to(be_true);
      expect(mock.jsmocha.expectations.all_passed([true,false,true])).to(be_false);
      expect(mock.jsmocha.expectations.all_passed([false])).to(be_false);
    }); // end it
    
    it("should be able to check all expectations", function(){
      mock.expects('a_method');
      mock.jsmocha.verify();
      var expected_fail_str = "\r\nobject: Object.a_method\r\nFAIL wrong number of invocations, expected exactly once invoked no times";
      expect(mock.jsmocha.expectations.reports()).to(equal, expected_fail_str);
      mock.a_method();
      mock.jsmocha.verify();
      var expected_pass_str = "\r\nobject: Object.a_method\r\nPASS expected exactly once invoked once";
      expect(mock.jsmocha.expectations.reports()).to(equal, expected_pass_str);
    }); // end it
    
    it("should return a parameters match failed report", function(){
      mock.expects('a_method').passing('a string');
      mock.jsmocha.verify();
      var expected_fail_str = "\r\nobject: Object.a_method";
      expected_fail_str  += "\r\nFAIL wrong number of invocations, expected exactly once invoked no times";
      expected_fail_str  += "\r\nFAIL expected (\"a string\") but got (undefined)";
      expect(mock.jsmocha.expectations.reports()).to(equal, expected_fail_str);
      mock.a_method();
      mock.jsmocha.verify();
      var expected_pass_str = "\r\nobject: Object.a_method";
      expected_pass_str  += "\r\nPASS expected exactly once invoked once";
      expected_pass_str  += "\r\nFAIL expected (\"a string\") but got ()";
      expect(mock.jsmocha.expectations.reports()).to(equal, expected_pass_str);
    }); // end it
    
    it("should return a parameters match failed report", function(){
      mock.expects('a_method').passing('a string');
      mock.a_method('a string');
      mock.jsmocha.verify();
      var expected_pass_str = "\r\nobject: Object.a_method";
      expected_pass_str  += "\r\nPASS expected exactly once invoked once";
      expect(mock.jsmocha.expectations.reports()).to(equal, expected_pass_str);
    }); // end it

  }); // end describe
}); // end suite
