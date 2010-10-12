describe("jsMocha.Mock for spying", function() {
  
  var mock;
  
  beforeEach(function(){
    mock = new Mock();
  });
  
  afterEach(function(){
    mock = null;
  });
  
  describe("spying", function() {
  
    var original_method_run = false;
    var first_arg           = undefined;
    var second_arg          = undefined;
    var third_arg           = undefined;
    
    afterEach(function() {
      original_method_run = false;
      first_arg           = undefined;
      second_arg          = undefined;
      third_arg           = undefined;
    }); // end after
  
    it("should have the spies method", function(){
      expect(mock.spies).toBeAFunction();
    }); // end it
    
    it("should call the original method", function() {
      mock.a_method = function(){
        original_method_run = true;
      };
      mock.spies('a_method');
      mock.a_method();
      expect(original_method_run).toBeTruthy();
    }); // end it
    
    it("should pass the parameters to the original method", function() {
      mock.a_method = function(first, second, third){
        first_arg  = first;
        second_arg = second;
        third_arg  = third;
      };
      mock.spies('a_method');
      mock.a_method(1,2,3);
      expect(first_arg).toEqual(1);
      expect(second_arg).toEqual(2);
      expect(third_arg).toEqual(3);
    }); // end it
    
    it("should not call the original method when using expects", function() {
      mock.a_method = function(){
        original_method_run = true;
      };
      mock.expects('a_method');
      mock.a_method();
      expect(original_method_run).toBeFalsy();
    }); // end it
    
    it("should not call the original method when using stubs", function() {
      mock.a_method = function(){
        original_method_run = true;
      };
      mock.stubs('a_method');
      mock.a_method();
      expect(original_method_run).toBeFalsy();
    }); // end it
    
  }); // end describe

}); // end describe
