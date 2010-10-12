describe("Match", function() {

  var mock;

  beforeEach(function(){
		mock = new Mock();
  });
  
  afterEach(function(){
    mock = null;
  });
  
  describe("string matcher", function() {
    
    it("should pass validation", function(){
  		mock.expects('a_method').passing(Match.a_string);
  		mock.a_method('a string');
  		expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
    
    it("should fail validation", function(){
  		mock.expects('a_method').passing(Match.a_string);
  		mock.a_method(1234);
  		expect(mock.jsmocha.verify()).toBeFalsy();
    }); // end it
    
  }); // end describe

  
  describe("array matcher", function() {
    
    it("should pass validation", function(){
  		mock.expects('a_method').passing(Match.an_array);
  		mock.a_method([1,2,3]);
  		expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
    
    it("should fail validation", function(){
  		mock.expects('a_method').passing(Match.an_array);
  		mock.a_method(1234);
  		expect(mock.jsmocha.verify()).toBeFalsy();
    }); // end it
    
  }); // end describe
  
  
  describe("function matcher", function() {
    
    it("should pass validation", function(){
  		mock.expects('a_method').passing(Match.a_function);
  		mock.a_method(function(){});
  		expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
    
    it("should fail validation", function(){
  		mock.expects('a_method').passing(Match.a_function);
  		mock.a_method(1234);
  		expect(mock.jsmocha.verify()).toBeFalsy();
    }); // end it
    
  }); // end describe
  
  
  describe("object matcher", function() {
    
    it("should pass validation", function(){
  		mock.expects('a_method').passing(Match.an_object);
  		mock.a_method({});
  		expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
    
    it("should fail validation", function(){
  		mock.expects('a_method').passing(Match.an_object);
  		mock.a_method(1234);
  		expect(mock.jsmocha.verify()).toBeFalsy();
    }); // end it
    
  }); // end describe
  
  
  describe("number matcher", function() {
    
    it("should pass validation", function(){
  		mock.expects('a_method').passing(Match.a_number);
  		mock.a_method(1234);
  		expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
    
    it("should fail validation", function(){
  		mock.expects('a_method').passing(Match.a_number);
  		mock.a_method("1234");
  		expect(mock.jsmocha.verify()).toBeFalsy();
    }); // end it
    
  }); // end describe
  
  
  describe("null matcher", function() {
    
    it("should pass validation", function(){
  		mock.expects('a_method').passing(Match.is_null);
  		mock.a_method(null);
  		expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
    
    it("should fail validation", function(){
  		mock.expects('a_method').passing(Match.is_null);
  		mock.a_method(1234);
  		expect(mock.jsmocha.verify()).toBeFalsy();
    }); // end it
    
  }); // end describe
  
  
  describe("date matcher", function() {
    
    it("should pass validation", function(){
  		mock.expects('a_method').passing(Match.a_date);
  		mock.a_method(new Date());
  		expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
    
    it("should fail validation", function(){
  		mock.expects('a_method').passing(Match.a_date);
  		mock.a_method(1234);
  		expect(mock.jsmocha.verify()).toBeFalsy();
    }); // end it
    
  }); // end describe
  
  
  describe("boolean matcher", function() {
    
    it("should pass validation with true", function(){
  		mock.expects('a_method').passing(Match.a_boolean);
  		mock.a_method(true);
  		expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
    
    it("should pass validation with false", function(){
  		mock.expects('a_method').passing(Match.a_boolean);
  		mock.a_method(false);
  		expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
    
    it("should fail validation", function(){
  		mock.expects('a_method').passing(Match.a_boolean);
  		mock.a_method(1234);
  		expect(mock.jsmocha.verify()).toBeFalsy();
    }); // end it
    
  }); // end describe
  
  
  describe("undefined matcher", function() {
    
    it("should pass validation", function(){
  		mock.expects('a_method').passing(Match.is_undefined);
  		mock.a_method(undefined);
  		expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
    
    it("should fail validation", function(){
  		mock.expects('a_method').passing(Match.is_undefined);
  		mock.a_method(1234);
  		expect(mock.jsmocha.verify()).toBeFalsy();
    }); // end it
    
  }); // end describe
  
}); // end describe
