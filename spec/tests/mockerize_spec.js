Screw.Unit(function() {
  
  describe("Mockerize", function() {
    
    describe("is_real_call", function() {
      
      it("should return true when called with only a string", function(){
        expect(Mock.is_real_call(['method'])).to(be_true);
      }); // end it

      it("should return false when called anything but a single string", function(){
        expect(Mock.is_real_call([new Date()])).to(be_false);
        expect(Mock.is_real_call(['string', 'string'])).to(be_false);
      }); // end it
      
    }); // end describe
    
    
    describe("calling mockerize", function() {
      
      before(function() {
        Mock.mockerize();
      }); // end before
      
      after(function() {
        Mock.teardown_all();
        delete Object.prototype.expects;
        delete Object.prototype.stubs;
        delete Function.prototype.expects;
        delete Function.prototype.stubs;
      }); // end after
      
      it("should add the expects and stubs methods to the function and object prototype", function() {
        expect(Object.prototype.expects).to(be_a_function);
        expect(Object.prototype.stubs).to(be_a_function);
        expect(Function.prototype.expects).to(be_a_function);
        expect(Function.prototype.stubs).to(be_a_function);
      }); // end it
      
      it("should mock an object when calling expects", function() {
        var obj = { hello: function(){ return 'world'; }};
        obj.expects('hello').returns('another world');
        expect(obj.hello()).to(equal, 'another world');
        obj.jsmocha.teardown();
        expect(obj.hello()).to(equal, 'world');
      }); // end it
      
      it("should stub an object when calling expects", function() {
        var obj = { hello: function(){ return 'world'; }};
        obj.stubs('hello').returns('another world');
        expect(obj.hello()).to(equal, 'another world');
        obj.jsmocha.teardown();
        expect(obj.hello()).to(equal, 'world');
      }); // end it
      
      it("should mock a function when calling expects", function() {
        var func = function(){};
        func.hello = function(){ return 'world'; }
        func.expects('hello').returns('another world');
        expect(func.hello()).to(equal, 'another world');
        func.jsmocha.teardown();
        expect(func.hello()).to(equal, 'world');
      }); // end it
      
      it("should stub a function when calling expects", function() {
        var func = function(){};
        func.hello = function(){ return 'world'; }
        func.stubs('hello').returns('another world');
        expect(func.hello()).to(equal, 'another world');
        func.jsmocha.teardown();
        expect(func.hello()).to(equal, 'world');
      }); // end it
    }); // end describe
    
  }); // end describe
}); // end suite
