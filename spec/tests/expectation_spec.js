Screw.Unit(function() {
  
  describe("jsMocha.Expectation", function() {
  
    var obj;
    var expectation;
    var mock;
  
    before(function(){
			function AnObject(){
				this.a_method = function(){
					return('original method');
				};
			}
			obj = new AnObject();
			expectation = new jsMocha.Expectation(obj, 'a_method');
			mock = new Mock();
    });
    
    after(function(){
      obj = null;
      expectation = null;
      mock = null;
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
    
    describe("passing", function() {
      
      it("should pass validation", function(){
    		mock.expects('a_method').passing('a string');
    		mock.a_method('a string');
    		expect(mock.jsmocha.verify()).to(be_true);
      }); // end it
      
      it("should fail validation when no params passed", function(){
        mock.expects('a_method').passing('a string');
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_false);
      }); // end it
      
      it("should fail validation an extra parameter is passed", function(){
        mock.expects('a_method').passing('a string');
        mock.a_method('a string', 'another string');
        expect(mock.jsmocha.verify()).to(be_false);
      }); // end it
      
      it("should fail validation when different params passed", function(){
        mock.expects('a_method').passing('a string');
        mock.a_method('another string');
        expect(mock.jsmocha.verify()).to(be_false);
      }); // end it
      
      it("should fail validation when a different type of param passed", function(){
        mock.expects('a_method').passing('a string');
        mock.a_method([1,2,3]);
        expect(mock.jsmocha.verify()).to(be_false);
      }); // end it
      
      it("should pass validation when using a matching block that returns true", function(){
        mock.expects('a_method').passing(function(p){ return p[0] == 'a string' ? true : false; });
        mock.a_method('a string');
        expect(mock.jsmocha.verify()).to(be_true);
      }); // end it
      
      it("should pass validation when using a matching block that returns false", function(){
        mock.expects('a_method').passing(function(p){ return p[0] == 'a string' ? true : false; });
        mock.a_method([1,2,3]);
        expect(mock.jsmocha.verify()).to(be_false);
      }); // end it
      
      it("should pass validation when using a matching block using multiple params", function(){
        mock.expects('a_method').passing(function(p){ return p[0] == 'a string' ? true : false; });
        mock.a_method('a string', 1, 'another string');
        expect(mock.jsmocha.verify()).to(be_true);
      }); // end it
      
      it("should fail validation when using a matching block when calling the mock multiple times", function(){
        mock.expects('a_method').times(3).passing(function(p){ return p[0] == 'a string' ? true : false; });
        mock.a_method('a string', 1, 'another string');
        mock.a_method('a string 2', 1, 'another string');
        mock.a_method('a string', 1, 'another string');
        expect(mock.jsmocha.verify()).to(be_false);
      }); // end it
      
      it("should fail validation when invoking multiple times", function(){
        mock.expects('a_method').times(3).passing(1);
        mock.a_method(1);
        mock.a_method(2);
        mock.a_method(1);
        expect(mock.jsmocha.verify()).to(be_false);
      }); // end it
    }); // end describe
    
    describe("returns", function() {
      
      var mock_with_method;
      
      before(function(){
        mock_with_method = {
          a_method: function(){
            return 'original';
          }
        };
        new Mock(mock_with_method);
      });
      
      it("should return values specified in the returns call", function(){
        mock_with_method.expects('return_string').returns('string');
        expect(mock_with_method.return_string()).to(equal, 'string');

        var array = [1,2,3,4];
        mock_with_method.expects('return_array').returns(array);
        expect(mock_with_method.return_array()).to(equal, array);

        var obj = {data: 'string'};
        mock_with_method.expects('return_object').returns(obj);
        expect(mock_with_method.return_object()).to(equal, obj);
      }); // end it
      
      it("should return multiple values one after the other when specified in the returns call", function(){
        mock_with_method.expects('a_method').returns('mocked1', 'mocked2', 'mocked3', 'mocked4');
        expect(mock_with_method.a_method()).to(equal, 'mocked1');
        expect(mock_with_method.a_method()).to(equal, 'mocked2');
        expect(mock_with_method.a_method()).to(equal, 'mocked3');
        expect(mock_with_method.a_method()).to(equal, 'mocked4');
        expect(mock_with_method.a_method()).to(equal, 'mocked4');
        expect(mock_with_method.a_method()).to(equal, 'mocked4');
        expect(mock_with_method.a_method()).to(equal, 'mocked4');
      }); // end it

    }); // end describe

  }); // end describe
}); // end suite
