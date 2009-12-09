Screw.Unit(function() {
  
  describe("jsMocha.Expectation", function() {
  
    var obj;
    var expectation;
  
    before(function(){
			function AnObject(){
				this.a_method = function(){
					return('original method');
				};
			}
			obj = new AnObject();
			expectation = new jsMocha.Expectation(obj, 'a_method');
    });
    
    after(function(){
      obj = null;
      expectation = null;
    });
  
    it("should replace the original method", function(){
			expect(obj.a_method()).to_not(equal, 'original method');
    }); // end it
    
    it("should pass invocation verification", function(){
      obj.a_method();
      expect(expectation.verify()).to(be_true);
    }); // end it
    
    it("should pass params verification", function(){
      expectation.passing('string');
      obj.a_method('string');
      expect(expectation.verify()).to(be_true);
    }); // end it
    
    it("should fail invocation verification", function(){
      expect(expectation.verify()).to(be_false);
    }); // end it
    
    it("should fail params verification", function(){
      expectation.passing('string');
      obj.a_method('string 2');
      expect(expectation.verify()).to(be_false);
    }); // end it
    
    it("should return an invocation report", function(){
      expectation.verify();
      var report_string = "object: AnObject.a_method";
      report_string  += "\r\nFAIL wrong number of invocations, expected exactly once invoked no times";
      expect(expectation.report()).to(equal, report_string);
    }); // end it
    
    it("should fail params verification and return a report", function(){
      expectation.passing('string');
      obj.a_method('string 2');
      expectation.verify();
      var report_string = "object: AnObject.a_method";
      report_string  += "\r\nPASS expected exactly once invoked once";
      report_string  += "\r\nFAIL expected (\"string\") but got (\"string 2\")";
      expect(expectation.report()).to(equal, report_string);
    }); // end it

  }); // end describe
}); // end suite
