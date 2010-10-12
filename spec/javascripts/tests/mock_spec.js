describe("jsMocha.Mock", function() {

  var mock;

  beforeEach(function(){
		mock = new Mock();
  });
  
  afterEach(function(){
    Mock.mocked_objects = [];
    mock = null;
  });
  
  
  describe("instance methods", function() {
  
    it("should have the verify method", function(){
      expect(mock.jsmocha.verify).toBeAFunction();
    }); // end it
  
    it("should have the report method", function(){
      expect(mock.jsmocha.report).toBeAFunction();
    }); // end it
  
    it("should have the teardown method", function(){
      expect(mock.jsmocha.teardown).toBeAFunction();
    }); // end it
    
  }); // end describe
  
  
  describe("class methods", function() {
  
    it("should have the mockerize method", function(){
      expect(Mock.mockerize).toBeAFunction();
    }); // end it
  
    it("should have the is_real_call method", function(){
      expect(Mock.is_real_call).toBeAFunction();
    }); // end it
  
    it("should have the mock_from_expects method", function(){
      expect(Mock.mock_from_expects).toBeAFunction();
    }); // end it
    
    it("should have the mock_from_stubs method", function(){
      expect(Mock.mock_from_stubs).toBeAFunction();
    }); // end it
    
    it("should have the teardown_all method", function(){
      expect(Mock.teardown_all).toBeAFunction();
    }); // end it
    
    it("should have the remove_from_mocked_objects method", function(){
      expect(Mock.mock_from_stubs).toBeAFunction();
    }); // end it
    
  }); // end describe
  
  
  describe("constructor", function() {
  
    describe("passing no existing object to the constructor", function() {
    
      it("should return a new mocked object", function(){
        expect(mock).toBeAnObject();
      }); // end it
    
      it("should have expects, stubs and jsmocha methods and object", function(){
        expect(mock.expects).toBeAFunction();
        expect(mock.stubs).toBeAFunction();
        expect(mock.jsmocha).toBeAnObject();
      }); // end it
    
      it("should not mock and already mocked object", function(){
        var mock2 = new Mock(mock);
        expect(mock2).toBe(mock);
      }); // end it

    }); // end describe
  
  
    describe("passing existing object to the constructor", function() {
    
      var obj;
    
      beforeEach(function(){
        function AnObject(){
          this.a_method = function(){
            alert('a_method called');
          };
        }
        obj = new AnObject();
      });
    
      afterEach(function(){
        obj = null;
      });
    
      it("should return the same object", function(){
        var mocked_object = new Mock(obj);
        expect(mocked_object).toBeAnObject();
        expect(mocked_object.a_method).toBeAFunction();
      }); // end it
    
      it("should have the jsmocha object", function(){
        var mocked_object = new Mock(obj);
        expect(mocked_object.jsmocha).toBeAnObject();
      }); // end it
    
      it("should return the same object when mocked twice", function(){
        var mock1 = new Mock(obj);
        var mock2 = new Mock(obj);
        expect(mock2).toBe(mock1);
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
        var call_to_mock = function(){ var a = new Mock(bad_obj); };
        expect(call_to_mock).toThrow();
      }); // end it
    
      it("should throw an exception when the stubs method already exists", function(){
        function BadExpectsObject(){
          this.stubs = function(){
            alert('stubs called');
          };
        }
        var bad_obj = new BadExpectsObject();
        var call_to_mock = function(){ var a = new Mock(bad_obj); };
        expect(call_to_mock).toThrow();
      }); // end it
    
      it("should not throw an exception when the force option is passed", function(){
        function BadExpectsObject(){
          this.expects = function(){
            alert('expects called');
          };
        }
        var bad_obj = new BadExpectsObject();
        var call_to_mock = function(){ var a = new Mock(bad_obj, true); };
        expect(call_to_mock).not.toThrow();
      }); // end it
    
      it("should throw an exception when the mocked object a string", function(){
        var string_call_to_mock = function(){ var a = new Mock('a string'); };
        expect(string_call_to_mock).toThrow();
      }); // end it
    
      it("should throw an exception when the mocked object an array", function(){
        var array_call_to_mock = function(){ var a = new Mock([1,2,3]); };
        expect(array_call_to_mock).toThrow();
      }); // end it
    
      it("should throw an exception when the mocked object a date", function(){
        var array_call_to_mock = function(){ var a = new Mock(new Date()); };
        expect(array_call_to_mock).toThrow();
      }); // end it
    
      it("should throw an exception when the mocked object a boolean", function(){
        call_to_mock = function(){ var a = new Mock(true); };
        expect(call_to_mock).toThrow();
      }); // end it

    }); // end describe
    
    
    describe("mocked_objects array", function() {
      
      it("should add the object to the mocked_objects array", function() {
        var mock2 = new Mock();
        var mock3 = new Mock();
        expect(Mock.mocked_objects.length).toEqual(3);
      }); // end it
    }); // end describe
  }); // end describe
  
  
  describe("report", function() {
    
    it("should return a string", function() {
      mock.expects('a_method');
      expect(mock.jsmocha.report()).toBeAString();
    }); // end it
    
    it("should remove the object from the mocked_objects array", function() {
      var mock2 = new Mock();
      mock.jsmocha.report();
      expect(Mock.mocked_objects.length).toEqual(1);
      mock2.jsmocha.report();
      expect(Mock.mocked_objects.length).toEqual(0);
    }); // end it
  }); // end describe
  
  
  describe("verify", function() {
  
    it("should return verify invocations correctly when expected once", function(){
      mock.expects('a_method');
      expect(mock.jsmocha.verify()).toBeFalsy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeTruthy();
      mock.expects('another_method').once();
      expect(mock.jsmocha.verify()).toBeFalsy();
      mock.another_method();
      expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
  
    it("should return verify invocations correctly when expected twice", function(){
      mock.expects('a_method').twice();
      expect(mock.jsmocha.verify()).toBeFalsy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeFalsy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
  
    it("should return verify invocations correctly when expected never", function(){
      mock.expects('a_method').never();
      expect(mock.jsmocha.verify()).toBeTruthy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeFalsy();
    }); // end it
  
    it("should return verify invocations correctly when expected 3 times", function(){
      mock.expects('a_method').times(3);
      expect(mock.jsmocha.verify()).toBeFalsy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeFalsy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeFalsy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
  
    it("should return verify invocations correctly when expected at least 3 times", function(){
      mock.expects('a_method').at_least(3);
      expect(mock.jsmocha.verify()).toBeFalsy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeFalsy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeFalsy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeTruthy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
  
    it("should return verify invocations correctly when expected at most 3 times", function(){
      mock.expects('a_method').at_most(3);
      expect(mock.jsmocha.verify()).toBeTruthy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeTruthy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeTruthy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeTruthy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeFalsy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeFalsy();
    }); // end it
  }); // end describe
  
  
  describe("teardown", function() {
    
    var mock_with_method;
    
    beforeEach(function(){
      mock_with_method = {
        a_method: function(){
          return 'original';
        }
      };
      var a = new Mock(mock_with_method);
    });
    
    it("should restore mocked object", function(){
      mock_with_method.expects('a_method').returns('mocked');
      expect(mock_with_method.a_method()).toEqual('mocked');
      mock_with_method.jsmocha.teardown(mock_with_method.jsmocha);
      expect(mock_with_method.a_method()).toEqual('original');
    }); // end it
    
    it("should remove mocha methods", function(){
      expect(mock_with_method.expects).toBeAFunction();
      expect(mock_with_method.stubs).toBeAFunction();
      expect(mock_with_method.jsmocha).toBeAnObject();
      mock_with_method.jsmocha.teardown();
      expect(mock_with_method.expects).toBeUndefined();
      expect(mock_with_method.stubs).toBeUndefined();
      expect(mock_with_method.jsmocha).toBeUndefined();
    }); // end it
  }); // end describe
  
  
  describe("teardown_all", function() {
    
    it("should reset the mocked_objects array", function() {
      Mock.teardown_all();
      expect(Mock.mocked_objects).toEqual([]);
    }); // end it
    
    it("should remove mocking from all mocked object", function() {
      var mock2 = new Mock({num: 2});
      var mock3 = new Mock({num: 3});
      Mock.teardown_all();
      expect(mock.expects).toBeUndefined();
      expect(mock.stubs).toBeUndefined();
      expect(mock.jsmocha).toBeUndefined();
      expect(mock2.expects).toBeUndefined();
      expect(mock2.stubs).toBeUndefined();
      expect(mock2.jsmocha).toBeUndefined();
      expect(mock3.expects).toBeUndefined();
      expect(mock3.stubs).toBeUndefined();
      expect(mock3.jsmocha).toBeUndefined();
    }); // end it
  }); // end describe
  
  
  describe("remove_from_mocked_objects", function() {
    
    it("should remove an item from the mocked_objects array", function() {
      var mock2 = new Mock();
      var mock3 = new Mock();
      expect(Mock.mocked_objects.length).toEqual(3);
      Mock.remove_from_mocked_objects(mock2);
      expect(Mock.mocked_objects.length).toEqual(2);
      Mock.remove_from_mocked_objects(mock);
      expect(Mock.mocked_objects.length).toEqual(1);
      Mock.remove_from_mocked_objects(mock3);
      expect(Mock.mocked_objects).toEqual([]);
    }); // end it
  }); // end describe
  
}); // end describe
