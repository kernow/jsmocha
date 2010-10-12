describe("Mockerize", function() {
  
  describe("is_real_call", function() {
    
    it("should return true when called with only a string", function(){
      expect(Mock.is_real_call(['method'])).toBeTruthy();
    }); // end it

    it("should return false when called anything but a single string", function(){
      expect(Mock.is_real_call([new Date()])).toBeFalsy();
      expect(Mock.is_real_call(['string', 'string'])).toBeFalsy();
    }); // end it
    
  }); // end describe
  
  
  describe("calling mockerize", function() {
    
    beforeEach(function() {
      Mock.mockerize();
    }); // end before
    
    afterEach(function() {
      Mock.teardown_all();
      delete Object.prototype.expects;
      delete Object.prototype.stubs;
      delete Object.prototype.spies;
      delete Function.prototype.expects;
      delete Function.prototype.stubs;
      delete Function.prototype.spies;
    }); // end after
    
    it("should add the expects, stubs and spies methods to the function and object prototype", function() {
      expect(Object.prototype.expects).toBeAFunction();
      expect(Object.prototype.stubs).toBeAFunction();
      expect(Object.prototype.spies).toBeAFunction();
      expect(Function.prototype.expects).toBeAFunction();
      expect(Function.prototype.stubs).toBeAFunction();
      expect(Function.prototype.spies).toBeAFunction();
    }); // end it
    
    it("should mock an object when calling expects", function() {
      var obj = { hello: function(){ return 'world'; }};
      obj.expects('hello').returns('another world');
      expect(obj.hello()).toEqual('another world');
      obj.jsmocha.teardown();
      expect(obj.hello()).toEqual('world');
    }); // end it
    
    it("should stub an object when calling expects", function() {
      var obj = { hello: function(){ return 'world'; }};
      obj.stubs('hello').returns('another world');
      expect(obj.hello()).toEqual('another world');
      obj.jsmocha.teardown();
      expect(obj.hello()).toEqual('world');
    }); // end it
    
    it("should mock a function when calling expects", function() {
      var func = function(){};
      func.hello = function(){ return 'world'; }
      func.expects('hello').returns('another world');
      expect(func.hello()).toEqual('another world');
      func.jsmocha.teardown();
      expect(func.hello()).toEqual('world');
    }); // end it
    
    it("should stub a function when calling expects", function() {
      var func = function(){};
      func.hello = function(){ return 'world'; }
      func.stubs('hello').returns('another world');
      expect(func.hello()).toEqual('another world');
      func.jsmocha.teardown();
      expect(func.hello()).toEqual('world');
    }); // end it
  }); // end describe
  
}); // end describe
