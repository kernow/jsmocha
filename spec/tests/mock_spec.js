Screw.Unit(function() {
  
  describe("jsMocha.Mock", function() {
  
    var mock;
  
    before(function(){
			mock = new Mock();
    });
    
    after(function(){
      mock = null;
    });
    
    describe("methods", function() {
    
      it("should have the verify method", function(){
        expect(mock.jsmocha.verify).to(be_a_function);
      }); // end it
    
      it("should have the report method", function(){
        expect(mock.jsmocha.report).to(be_a_function);
      }); // end it
    
      it("should have the teardown method", function(){
        expect(mock.jsmocha.teardown).to(be_a_function);
      }); // end it
      
    }); // end describe
    
    describe("verify", function() {
    
      it("should return verify invocations correctly when expected once", function(){
        mock.expects('a_method');
        expect(mock.jsmocha.verify()).to(be_false);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_true);
        mock.expects('another_method').once();
        expect(mock.jsmocha.verify()).to(be_false);
        mock.another_method();
        expect(mock.jsmocha.verify()).to(be_true);
      }); // end it
    
      it("should return verify invocations correctly when expected twice", function(){
        mock.expects('a_method').twice();
        expect(mock.jsmocha.verify()).to(be_false);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_false);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_true);
      }); // end it
    
      it("should return verify invocations correctly when expected never", function(){
        mock.expects('a_method').never();
        expect(mock.jsmocha.verify()).to(be_true);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_false);
      }); // end it
    
      it("should return verify invocations correctly when expected 3 times", function(){
        mock.expects('a_method').times(3);
        expect(mock.jsmocha.verify()).to(be_false);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_false);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_false);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_true);
      }); // end it
    
      it("should return verify invocations correctly when expected at least 3 times", function(){
        mock.expects('a_method').at_least(3);
        expect(mock.jsmocha.verify()).to(be_false);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_false);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_false);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_true);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_true);
      }); // end it
    
      it("should return verify invocations correctly when expected at most 3 times", function(){
        mock.expects('a_method').at_most(3);
        expect(mock.jsmocha.verify()).to(be_true);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_true);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_true);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_true);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_false);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_false);
      }); // end it
    }); // end describe
    
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
    }); // end describe
    
    
    describe("restore", function() {
      
      var mock_with_method;
      
      before(function(){
        mock_with_method = {
          a_method: function(){
            return 'original';
          }
        };
        new Mock(mock_with_method);
      });
      
      it("should restore mocked object", function(){
        mock_with_method.expects('a_method').returns('mocked');
        expect(mock_with_method.a_method()).to(equal, 'mocked');
        mock_with_method.jsmocha.teardown(mock_with_method.jsmocha);
        expect(mock_with_method.a_method()).to(equal, 'original');
      }); // end it
      
      it("should remove mocha methods", function(){
        expect(mock_with_method.expects).to(be_a_function);
        expect(mock_with_method.stubs).to(be_a_function);
        expect(mock_with_method.jsmocha).to(be_an_object);
        mock_with_method.jsmocha.teardown();
        expect(mock_with_method.expects).to(be_undefined);
        expect(mock_with_method.stubs).to(be_undefined);
        expect(mock_with_method.jsmocha).to(be_undefined);
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
    
    
    describe("passing no existing object to the constructor", function() {
      
      it("should return a new mocked object", function(){
        expect(mock).to(be_an_object);
      }); // end it
      
      it("should have expects, stubs and jsmocha methods and object", function(){
        expect(mock.expects).to(be_a_function);
        expect(mock.stubs).to(be_a_function);
        expect(mock.jsmocha).to(be_an_object);
      }); // end it
      
      it("should not mock and already mocked object", function(){
        var mock2 = new Mock(mock);
        expect(mock2).to(be_identical_to, mock);
      }); // end it

    }); // end describe
    
    
    describe("passing existing object to the constructor", function() {
      
      var obj;
      
      before(function(){
        function AnObject(){
          this.a_method = function(){
            alert('a_method called');
          };
        }
        obj = new AnObject();
      });
      
      after(function(){
        obj = null;
      });
      
      it("should return the same object", function(){
        var mocked_object = new Mock(obj);
        expect(mocked_object).to(be_an_object);
        expect(mocked_object.a_method).to(be_a_function);
      }); // end it
      
      it("should have the jsmocha object", function(){
        var mocked_object = new Mock(obj);
        expect(mocked_object.jsmocha).to(be_an_object);
      }); // end it
      
      it("should return the same object when mocked twice", function(){
        var mock1 = new Mock(obj);
        var mock2 = new Mock(obj);
        expect(mock2).to(be_identical_to, mock1);
      }); // end it

    }); // end describe
    
    
    describe("passing existing object to the constructor", function() {
      
      it("should throw an exception when the expects method already exists", function(){
        function BadExpectsObject(){
          this.expects = function(){
            alert('expects called');
          };
        }
        var bad_obj = new BadExpectsObject();
        var call_to_mock = function(){ new Mock(bad_obj) };
        expect(call_to_mock).to(throw_exception);
      }); // end it
      
      it("should throw an exception when the stubs method already exists", function(){
        function BadExpectsObject(){
          this.stubs = function(){
            alert('stubs called');
          };
        }
        var bad_obj = new BadExpectsObject();
        var call_to_mock = function(){ new Mock(bad_obj) };
        expect(call_to_mock).to(throw_exception);
      }); // end it
      
      it("should throw an exception when the mocked object a string", function(){
        var string_call_to_mock = function(){ new Mock('a string') };
        expect(string_call_to_mock).to(throw_exception);
      }); // end it
      
      it("should throw an exception when the mocked object an array", function(){
        var array_call_to_mock = function(){ new Mock([1,2,3]) };
        expect(array_call_to_mock).to(throw_exception);
      }); // end it
      
      it("should throw an exception when the mocked object a date", function(){
        var array_call_to_mock = function(){ new Mock(new Date()) };
        expect(array_call_to_mock).to(throw_exception);
      }); // end it
      
      it("should throw an exception when the mocked object a boolean", function(){
        call_to_mock = function(){ new Mock(true) };
        expect(call_to_mock).to(throw_exception);
      }); // end it

    }); // end describe

  }); // end describe
}); // end suite
