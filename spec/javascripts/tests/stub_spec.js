describe("jsMocha.Mock for subbing", function() {
  
  var mock;
  
  beforeEach(function(){
    mock = new Mock();
  });
  
  afterEach(function(){
    mock = null;
  });
  
  describe("subbing", function() {
  
    it("should have the stubs method", function(){
      expect(mock.stubs).toBeAFunction();
    }); // end it
  
    it("should always return true when verify is called", function(){
      mock.stubs('a_method');
      expect(mock.jsmocha.verify()).toBeTruthy();
      mock.a_method();
      expect(mock.jsmocha.verify()).toBeTruthy();
      mock.a_method('with params');
      expect(mock.jsmocha.verify()).toBeTruthy();
      mock.a_method('with other params');
      expect(mock.jsmocha.verify()).toBeTruthy();
    }); // end it
  
    it("should return a sequence of data", function(){
      mock.stubs('a_method').returns(1,2,3);
      expect(mock.a_method()).toEqual(1);
      expect(mock.a_method()).toEqual(2);
      expect(mock.a_method()).toEqual(3);
      expect(mock.a_method()).toEqual(3);
    }); // end it
    
  }); // end describe
  
  describe("reporting", function() {
    
    it("should return a report when not invoked", function(){
      mock.stubs('a_method');
      mock.jsmocha.verify();
      var report_string = "\r\nobject: Object.a_method";
      report_string += "\r\nINFO called 0 time(s)";
      report_string += "\r\nPASS allowed any number of times invoked no times";
      expect(mock.jsmocha.report()).toEqual(report_string);
    }); // end it
    
    it("should return a report when invoked once", function(){
      mock.stubs('a_method');
      mock.a_method();
      mock.jsmocha.verify();
      var report_string = "\r\nobject: Object.a_method";
      report_string  += "\r\nINFO called 1 time(s)";
      report_string  += "\r\nPASS allowed any number of times invoked once";
      expect(mock.jsmocha.report()).toEqual(report_string);
    }); // end it
    
    it("should return a report when invoked twice", function(){
      mock.stubs('a_method');
      mock.a_method();
      mock.a_method();
      mock.jsmocha.verify();
      var report_string = "\r\nobject: Object.a_method";
      report_string  += "\r\nINFO called 2 time(s)";
      report_string  += "\r\nPASS allowed any number of times invoked twice";
      expect(mock.jsmocha.report()).toEqual(report_string);
    }); // end it
    
    it("should return a report when invoked five time", function(){
      mock.stubs('a_method');
      mock.a_method();
      mock.a_method();
      mock.a_method();
      mock.a_method();
      mock.a_method();
      mock.jsmocha.verify();
      var report_string = "\r\nobject: Object.a_method";
      report_string  += "\r\nINFO called 5 time(s)";
      report_string  += "\r\nPASS allowed any number of times invoked 5 times";
      expect(mock.jsmocha.report()).toEqual(report_string);
    }); // end it
    
  }); // end describe

}); // end describe
