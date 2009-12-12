Screw.Unit(function() {
  
  describe("jsMocha.Mock", function() {
  
    var mock;
  
    before(function(){
			mock = new Mock();
    });
    
    after(function(){
      Mock.mocked_objects = [];
      mock = null;
    });
    
    
    describe("instance methods", function() {
    
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
    
    
    describe("class methods", function() {
    
      it("should have the mockerize method", function(){
        expect(Mock.mockerize).to(be_a_function);
      }); // end it
    
      it("should have the is_real_call method", function(){
        expect(Mock.is_real_call).to(be_a_function);
      }); // end it
    
      it("should have the mock_from_expects method", function(){
        expect(Mock.mock_from_expects).to(be_a_function);
      }); // end it
      
      it("should have the mock_from_stubs method", function(){
        expect(Mock.mock_from_stubs).to(be_a_function);
      }); // end it
      
      it("should have the teardown_all method", function(){
        expect(Mock.teardown_all).to(be_a_function);
      }); // end it
      
      it("should have the remove_from_mocked_objects method", function(){
        expect(Mock.mock_from_stubs).to(be_a_function);
      }); // end it
      
    }); // end describe
    
    
    describe("constructor", function() {
    
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
    
    
      describe("passing an object to the constructor", function() {
      
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
      
        it("should not throw an exception when the force option is passed", function(){
          function BadExpectsObject(){
            this.expects = function(){
              alert('expects called');
            };
          }
          var bad_obj = new BadExpectsObject();
          var call_to_mock = function(){ new Mock(bad_obj, true) };
          expect(call_to_mock).to_not(throw_exception);
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
      
      
      describe("mocked_objects array", function() {
        
        it("should add the object to the mocked_objects array", function() {
          var mock2 = new Mock();
          var mock3 = new Mock();
          expect(Mock.mocked_objects.length).to(equal, 3);
        }); // end it
      }); // end describe
    }); // end describe
    
    
    describe("report", function() {
      
      it("should return a string", function() {
        mock.expects('a_method');
        expect(mock.jsmocha.report()).to(be_a_string);
      }); // end it
      
      it("should remove the object from the mocked_objects array", function() {
        var mock2 = new Mock();
        mock.jsmocha.report();
        expect(Mock.mocked_objects.length).to(equal, 1);
        mock2.jsmocha.report();
        expect(Mock.mocked_objects.length).to(equal, 0);
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
    
    
    describe("teardown", function() {
      
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
    
    
    describe("teardown_all", function() {
      
      it("should reset the mocked_objects array", function() {
        Mock.teardown_all();
        expect(Mock.mocked_objects).to(equal, []);
      }); // end it
      
      it("should remove mocking from all mocked object", function() {
        var mock2 = new Mock({num: 2});
        var mock3 = new Mock({num: 3});
        Mock.teardown_all();
        expect(mock.expects).to(be_undefined);
        expect(mock.stubs).to(be_undefined);
        expect(mock.jsmocha).to(be_undefined);
        expect(mock2.expects).to(be_undefined);
        expect(mock2.stubs).to(be_undefined);
        expect(mock2.jsmocha).to(be_undefined);
        expect(mock3.expects).to(be_undefined);
        expect(mock3.stubs).to(be_undefined);
        expect(mock3.jsmocha).to(be_undefined);
      }); // end it
    }); // end describe
    
    
    describe("remove_from_mocked_objects", function() {
      
      it("should remove an item from the mocked_objects array", function() {
        var mock2 = new Mock();
        var mock3 = new Mock();
        expect(Mock.mocked_objects.length).to(equal, 3);
        Mock.remove_from_mocked_objects(mock2);
        expect(Mock.mocked_objects.length).to(equal, 2);
        Mock.remove_from_mocked_objects(mock);
        expect(Mock.mocked_objects.length).to(equal, 1);
        Mock.remove_from_mocked_objects(mock3);
        expect(Mock.mocked_objects).to(equal, []);
      }); // end it
    }); // end describe
    
  }); // end describe
}); // end suite
