describe("jsMocha.Cardinality", function() {

  it("should return instances of itself", function(){
    expect(jsMocha.Cardinality.exactly(1)).toBeAnObject();
		expect(jsMocha.Cardinality.at_least(1)).toBeAnObject();
		expect(jsMocha.Cardinality.at_most(1)).toBeAnObject();
  }); // end it
  
  it("should have the required functions", function(){
    var instance = jsMocha.Cardinality.exactly(1);
    expect(instance.verify).toBeAFunction();
    expect(instance.allowed_any_number_of_times).toBeAFunction();
    expect(instance.inspect).toBeAFunction();
    expect(instance.times).toBeAFunction();
  }); // end it
  
  it("should return true or false when exactly is specified", function(){
    var instance = jsMocha.Cardinality.exactly(1);
    expect(instance.verify(0)).toBeFalsy();
    expect(instance.verify(1)).toBeTruthy();
    expect(instance.verify(2)).toBeFalsy();
  }); // end it
  
  it("should return true or false when at_least is specified", function(){
    var instance = jsMocha.Cardinality.at_least(5);
    expect(instance.verify(0)).toBeFalsy();
    expect(instance.verify(1)).toBeFalsy();
    expect(instance.verify(3)).toBeFalsy();
    expect(instance.verify(5)).toBeTruthy();
    expect(instance.verify(6)).toBeTruthy();
    expect(instance.verify(20)).toBeTruthy();
  }); // end it
  
  it("should return true or false when at_most is specified", function(){
    var instance = jsMocha.Cardinality.at_most(5);
    expect(instance.verify(0)).toBeTruthy();
    expect(instance.verify(1)).toBeTruthy();
    expect(instance.verify(3)).toBeTruthy();
    expect(instance.verify(5)).toBeTruthy();
    expect(instance.verify(6)).toBeFalsy();
    expect(instance.verify(20)).toBeFalsy();
  }); // end it
  
  it("should return true when any number of times is specified", function(){
    var instance = jsMocha.Cardinality.at_least(0);
    expect(instance.verify(0)).toBeTruthy();
    expect(instance.verify(1)).toBeTruthy();
    expect(instance.verify(2)).toBeTruthy();
    expect(instance.verify(5000)).toBeTruthy();
  }); // end it
  
  it("should return the correct string", function(){
    var instance = jsMocha.Cardinality.at_least(5);
    expect(instance.times(0)).toEqual('no times');
    expect(instance.times(1)).toEqual('once');
    expect(instance.times(2)).toEqual('twice');
    expect(instance.times(3)).toEqual('3 times');
    expect(instance.times(50)).toEqual('50 times');
  }); // end it
  
  it("should return the number of invocations expected when calling exactly", function(){
    var instance = jsMocha.Cardinality.exactly(5);
    expect(instance.inspect()).toEqual('expected exactly 5 times');
  }); // end it
  
  it("should return the number of invocations expected when calling at_least", function(){
    var instance = jsMocha.Cardinality.at_least(5);
    expect(instance.inspect()).toEqual('expected at least 5 times');
  }); // end it
  
  it("should return the number of invocations expected when calling at_most", function(){
    var instance = jsMocha.Cardinality.at_most(5);
    expect(instance.inspect()).toEqual('expected at most 5 times');
  }); // end it
  
  it("should return the number of invocations expected when calling never", function(){
    var instance = jsMocha.Cardinality.exactly(0);
    expect(instance.inspect()).toEqual('expected never');
  }); // end it
  
  it("should return the number of invocations expected when calling any number of times", function(){
    var instance = jsMocha.Cardinality.at_least(0);
    expect(instance.inspect()).toEqual('allowed any number of times');
  }); // end it
}); // end describe