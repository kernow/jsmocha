Screw.Unit(function() {
  
  describe("Cardinality", function() {
  
    it("should return instances of itself", function(){
      expect(jsMocha.Cardinality.exactly(1)).to(be_an_object);
			expect(jsMocha.Cardinality.at_least(1)).to(be_an_object);
			expect(jsMocha.Cardinality.at_most(1)).to(be_an_object);
    }); // end it
    
    it("should have the required functions", function(){
      var instance = jsMocha.Cardinality.exactly(1);
      expect(instance.verify).to(be_a_function);
      expect(instance.allowed_any_number_of_times).to(be_a_function);
      expect(instance.inspect).to(be_a_function);
      expect(instance.times).to(be_a_function);
    }); // end it
    
    it("should return true or false when exactly is specified", function(){
      var instance = jsMocha.Cardinality.exactly(1);
      expect(instance.verify(0)).to(be_false);
      expect(instance.verify(1)).to(be_true);
      expect(instance.verify(2)).to(be_false);
    }); // end it
    
    it("should return true or false when at_least is specified", function(){
      var instance = jsMocha.Cardinality.at_least(5);
      expect(instance.verify(0)).to(be_false);
      expect(instance.verify(1)).to(be_false);
      expect(instance.verify(3)).to(be_false);
      expect(instance.verify(5)).to(be_true);
      expect(instance.verify(6)).to(be_true);
      expect(instance.verify(20)).to(be_true);
    }); // end it
    
    it("should return true or false when at_most is specified", function(){
      var instance = jsMocha.Cardinality.at_most(5);
      expect(instance.verify(0)).to(be_true);
      expect(instance.verify(1)).to(be_true);
      expect(instance.verify(3)).to(be_true);
      expect(instance.verify(5)).to(be_true);
      expect(instance.verify(6)).to(be_false);
      expect(instance.verify(20)).to(be_false);
    }); // end it
    
    it("should return true when any number of times is specified", function(){
      var instance = jsMocha.Cardinality.at_least(0);
      expect(instance.verify(0)).to(be_true);
      expect(instance.verify(1)).to(be_true);
      expect(instance.verify(2)).to(be_true);
      expect(instance.verify(5000)).to(be_true);
    }); // end it
    
    it("should return the correct string", function(){
      var instance = jsMocha.Cardinality.at_least(5);
      expect(instance.times(0)).to(equal, 'no times');
      expect(instance.times(1)).to(equal, 'once');
      expect(instance.times(2)).to(equal, 'twice');
      expect(instance.times(3)).to(equal, '3 times');
      expect(instance.times(50)).to(equal, '50 times');
    }); // end it
    
    it("should return the number of invocations expected when calling exactly", function(){
      var instance = jsMocha.Cardinality.exactly(5);
      expect(instance.inspect()).to(equal, 'expected exactly 5 times');
    }); // end it
    
    it("should return the number of invocations expected when calling at_least", function(){
      var instance = jsMocha.Cardinality.at_least(5);
      expect(instance.inspect()).to(equal, 'expected at least 5 times');
    }); // end it
    
    it("should return the number of invocations expected when calling at_most", function(){
      var instance = jsMocha.Cardinality.at_most(5);
      expect(instance.inspect()).to(equal, 'expected at most 5 times');
    }); // end it
    
    it("should return the number of invocations expected when calling never", function(){
      var instance = jsMocha.Cardinality.exactly(0);
      expect(instance.inspect()).to(equal, 'expected never');
    }); // end it
    
    it("should return the number of invocations expected when calling any number of times", function(){
      var instance = jsMocha.Cardinality.at_least(0);
      expect(instance.inspect()).to(equal, 'allowed any number of times');
    }); // end it
  }); // end describe
}); // end suite
