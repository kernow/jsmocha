describe("jsMocha.ExpectationList", function() {

  var expectation_list;
  var mock;
  var obj;

  beforeEach(function(){
    expectation_list = new jsMocha.ExpectationList();
   mock = new Mock();
   
   function AnObject(){
     this.a_method = function(){
       return('original method');
     };
   }
   obj = new AnObject();
  });
  
  afterEach(function(){
    expectation_list = null;
    mock = null;
  });

  it("should be an object", function(){
    expect(expectation_list.expectations).toBeAnObject();
  }); // end it
  
  it("should replace the original method", function(){
    expectation_list.add(obj, 'a_method');
    expect(obj.a_method()).toNotEqual('original method');
  }); // end it
  
  it("should store the global invocation count for a method", function() {
    expectation_list.add(obj, 'a_method');
    expect(expectation_list.expectations['a_method'].invocation_count).toEqual(0);
    obj.a_method();
    expect(expectation_list.expectations['a_method'].invocation_count).toEqual(1);
    obj.a_method();
    expect(expectation_list.expectations['a_method'].invocation_count).toEqual(2);
    obj.a_method();
    expect(expectation_list.expectations['a_method'].invocation_count).toEqual(3);
  }); // end it
  
  it("should be able to add expectations", function(){
    expectation_list.add(mock, 'a_method');
    expect(expectation_list.expectations['a_method'].expectations.mock.length).toEqual(1);
    expectation_list.add(mock, 'a_method');
    expect(expectation_list.expectations['a_method'].expectations.mock.length).toEqual(2);
    expectation_list.add(mock, 'another_method');
    expect(expectation_list.expectations['another_method'].expectations.mock.length).toEqual(1);
  }); // end it
  
  it("should be able to verify all expectations", function(){
    mock.expects('a_method');
    mock.a_method();
    expect(mock.jsmocha.verify()).toBeTruthy();
  }); // end it
  
  it("should return false if array contains a false, otherwise true", function(){
    mock.expects('a_method');
    expect(mock.jsmocha.expectations.all_passed([true,true,true])).toBeTruthy();
    expect(mock.jsmocha.expectations.all_passed([true])).toBeTruthy();
    expect(mock.jsmocha.expectations.all_passed([true,false,true])).toBeFalsy();
    expect(mock.jsmocha.expectations.all_passed([false])).toBeFalsy();
  }); // end it
  
  it("should be able to check all expectations", function(){
    mock.expects('a_method');
    mock.jsmocha.verify();
    var expected_fail_str = "\r\nobject: Object.a_method";
    expected_fail_str += "\r\nINFO called 0 time(s)";
    expected_fail_str += "\r\nFAIL wrong number of invocations, expected exactly once invoked no times";
    expect(mock.jsmocha.expectations.reports()).toEqual(expected_fail_str);
    mock.a_method();
    mock.jsmocha.verify();
    var expected_pass_str = "\r\nobject: Object.a_method";
    expected_pass_str += "\r\nINFO called 1 time(s)";
    expected_pass_str += "\r\nPASS expected exactly once invoked once";
    expect(mock.jsmocha.expectations.reports()).toEqual(expected_pass_str);
  }); // end it
  
  it("should return a parameters match failed report", function(){
    mock.expects('a_method').passing('a string');
    mock.jsmocha.verify();
    var expected_fail_str = "\r\nobject: Object.a_method";
    expected_fail_str  += "\r\nINFO called 0 time(s)";
    expected_fail_str  += "\r\nFAIL wrong number of invocations, expected exactly once with(\"a string\") invoked no times";
    expect(mock.jsmocha.expectations.reports()).toEqual(expected_fail_str);
    mock.a_method();
    mock.jsmocha.verify();
    var expected_pass_str = "\r\nobject: Object.a_method";
    expected_pass_str += "\r\nINFO called 1 time(s)";
    expected_pass_str  += "\r\nFAIL wrong number of invocations, expected exactly once with(\"a string\") invoked no times";
    expect(mock.jsmocha.expectations.reports()).toEqual(expected_pass_str);
  }); // end it
  
  it("should return a parameters match success report", function(){
    mock.expects('a_method').passing('a string');
    mock.a_method('a string');
    mock.jsmocha.verify();
    var expected_pass_str = "\r\nobject: Object.a_method";
    expected_pass_str += "\r\nINFO called 1 time(s)";
    expected_pass_str  += "\r\nPASS expected exactly once with(\"a string\") invoked once";
    expect(mock.jsmocha.expectations.reports()).toEqual(expected_pass_str);
  }); // end it
  
  it("should fail and return a report", function() {
    mock.expects('a_method').passing('a string');
    mock.a_method('a string 2');
    expect(mock.jsmocha.verify()).toBeFalsy();
    var expected_fail_str = "\r\nobject: Object.a_method";
    expected_fail_str  += "\r\nINFO called 1 time(s)";
    expected_fail_str  += "\r\nFAIL wrong number of invocations, expected exactly once with(\"a string\") invoked no times";
    expect(mock.jsmocha.expectations.reports()).toEqual(expected_fail_str);
  }); // end it

}); // end describe
