Screw.Unit(function() {
  
  describe("jsMocha.Mock for spying", function() {
    
    var mock;
    
    before(function(){
      mock = new Mock();
    });
    
    after(function(){
      mock = null;
    });
    
    describe("spying", function() {
    
      var original_method_run = false;
      var first_arg           = undefined;
      var second_arg          = undefined;
      var third_arg           = undefined;
      
      after(function() {
        original_method_run = false;
        first_arg           = undefined;
        second_arg          = undefined;
        third_arg           = undefined;
      }); // end after
    
      it("should have the spies method", function(){
        expect(mock.spies).to(be_a_function);
      }); // end it
      
      it("should call the original method", function() {
        mock.a_method = function(){
          original_method_run = true;
        };
        mock.spies('a_method');
        mock.a_method();
        expect(original_method_run).to(be_true);
      }); // end it
      
      it("should pass the parameters to the original method", function() {
        mock.a_method = function(first, second, third){
          first_arg  = first;
          second_arg = second;
          third_arg  = third;
        };
        mock.spies('a_method');
        mock.a_method(1,2,3);
        expect(first_arg).to(equal, 1);
        expect(second_arg).to(equal, 2);
        expect(third_arg).to(equal, 3);
      }); // end it
      
      it("should not call the original method when using expects", function() {
        mock.a_method = function(){
          original_method_run = true;
        };
        mock.expects('a_method');
        mock.a_method();
        expect(original_method_run).to(be_false);
      }); // end it
      
      it("should not call the original method when using stubs", function() {
        mock.a_method = function(){
          original_method_run = true;
        };
        mock.stubs('a_method');
        mock.a_method();
        expect(original_method_run).to(be_false);
      }); // end it
      
    }); // end describe

  }); // end describe
}); // end suite
