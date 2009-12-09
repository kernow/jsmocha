Screw.Unit(function() {
  
  describe("jsMocha.Mock for subbing", function() {
    
    var mock;
    
    before(function(){
      mock = new Mock();
    });
    
    after(function(){
      mock = null;
    });
    
    describe("subbing", function() {
    
      it("should have the stubs method", function(){
        expect(mock.stubs).to(be_a_function);
      }); // end it
    
      it("should always return true when verify is called", function(){
        mock.stubs('a_method');
        expect(mock.jsmocha.verify()).to(be_true);
        mock.a_method();
        expect(mock.jsmocha.verify()).to(be_true);
        mock.a_method('with params');
        expect(mock.jsmocha.verify()).to(be_true);
        mock.a_method('with other params');
        expect(mock.jsmocha.verify()).to(be_true);
      }); // end it
    
      it("should return a sequence of data", function(){
        this.mock.stubs('a_method').returns(1,2,3);
        expect(this.mock.a_method()).to(equal, 1);
        expect(this.mock.a_method()).to(equal, 2);
        expect(this.mock.a_method()).to(equal, 3);
        expect(this.mock.a_method()).to(equal, 3);
      }); // end it
      
    }); // end describe
    
    describe("reporting", function() {
      
      it("should return a report when not invoked", function(){
        mock.stubs('a_method');
        mock.jsmocha.verify();
        var report_string = "\r\nobject: Object.a_method";
        report_string  += "\r\nPASS allowed any number of times invoked no times";
        expect(mock.jsmocha.report()).to(equal, report_string);
      }); // end it
      
      it("should return a report when invoked once", function(){
        mock.stubs('a_method');
        mock.a_method();
        mock.jsmocha.verify();
        var report_string = "\r\nobject: Object.a_method";
        report_string  += "\r\nPASS allowed any number of times invoked once";
        expect(mock.jsmocha.report()).to(equal, report_string);
      }); // end it
      
      it("should return a report when invoked twice", function(){
        mock.stubs('a_method');
        mock.a_method();
        mock.a_method();
        mock.jsmocha.verify();
        var report_string = "\r\nobject: Object.a_method";
        report_string  += "\r\nPASS allowed any number of times invoked twice";
        expect(mock.jsmocha.report()).to(equal, report_string);
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
        report_string  += "\r\nPASS allowed any number of times invoked 5 times";
        expect(mock.jsmocha.report()).to(equal, report_string);
      }); // end it
      
    }); // end describe

  }); // end describe
}); // end suite
