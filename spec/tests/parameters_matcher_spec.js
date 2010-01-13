Screw.Unit(function() {
  
  describe("jsMocha.ParametersMatch", function() {
    
    var get_args;

    before(function(){
      get_args = function(){ return(arguments); };
    });
  
    after(function(){
      get_args = null;
    });
    
    describe("matcher", function() {
  
      it("should match a string", function(){
        var args = get_args('a string');
        var bad_args = get_args('a string 2');
        var pm = new jsMocha.ParametersMatcher(args);
        expect(pm.match(args)).to(be_true);
        expect(pm.match(bad_args)).to(be_false);
      }); // end it
    
      it("should match multiple strings", function(){
        var args = get_args('string 1', 'string 2', 'string 3', 'string 4');
        var bad_args = get_args('string 1', 'string 4', 'string 3', 'string 2');
        var pm = new jsMocha.ParametersMatcher(args);
        expect(pm.match(args)).to(be_true);
        expect(pm.match(bad_args)).to(be_false);
      }); // end it
    
      it("should match an array", function(){
        var args = get_args([1,2,3,4]);
        var bad_args = get_args([3,2,1,4]);
        var pm = new jsMocha.ParametersMatcher(args);
        expect(pm.match(args)).to(be_true);
        expect(pm.match(bad_args)).to(be_false);
      }); // end it
    
      it("should match arrays of different length", function(){
        var args = get_args([1,2,3,4,5,6]);
        var bad_args1 = get_args([3,2,1,4]);
        var bad_args2 = get_args([3,2,1,4,5,6,7,8]);
        var pm = new jsMocha.ParametersMatcher(args);
        expect(pm.match(bad_args1)).to(be_false);
        expect(pm.match(bad_args2)).to(be_false);
      }); // end it
    
      it("should match multiple arrays", function(){
        var args = get_args([1,2,3,4],[5,6,7,8],[9,10,11,12]);
        var bad_args1 = get_args([1,2,3,4],[5,4,7,8],[9,10,11,12]);
        var bad_args2 = get_args([1,9,3,4],[5,4,7,8],[9,10,11,12]);
        var bad_args3 = get_args([1,2,3,4],[5,4,7,8],[9,10,6,12]);
        var pm = new jsMocha.ParametersMatcher(args);
        expect(pm.match(args)).to(be_true);
        expect(pm.match(bad_args1)).to(be_false);
        expect(pm.match(bad_args2)).to(be_false);
        expect(pm.match(bad_args3)).to(be_false);
      }); // end it
    
      it("should match an object", function(){
        var args = get_args({data: 'string'});
        var bad_args1 = get_args({data: 'string 2'});
        var bad_args2 = get_args({data: 'string', other_data: [1,2,3]});
        var pm = new jsMocha.ParametersMatcher(args);
        expect(pm.match(args)).to(be_true);
        expect(pm.match(bad_args1)).to(be_false);
        expect(pm.match(bad_args2)).to(be_false);
      }); // end it
    
      it("should match multiple object", function(){
        var args = get_args({data: 'string'},{data: 'another string'});
        var bad_args1 = get_args({data: 'string 2'},{data: 'another string'});
        var bad_args2 = get_args({data: 'string'},{data: 'another string 2'});
        var bad_args3 = get_args({data: 'string'},{data_string: 'another string'});
        var pm = new jsMocha.ParametersMatcher(args);
        expect(pm.match(args)).to(be_true);
        expect(pm.match(bad_args1)).to(be_false);
        expect(pm.match(bad_args2)).to(be_false);
        expect(pm.match(bad_args3)).to(be_false);
      }); // end it
    
      it("should match complex objects", function(){
        var obj = {
          nested_obj: {
            data: 'string',
            other_data: [1,2,3]
          },
          an_array: [1,2,3,4,5,6],
          a_string: 'string'
        };
        var bad_obj1 = {
          nested_obj: {
            data: 'string2',
            other_data: [1,2,3]
          },
          an_array: [1,2,3,4,5,6],
          a_string: 'string'
        };
        var bad_obj2 = {
          nested_obj: {
            data: 'string',
            other_data: [1,2,3,4]
          },
          an_array: [1,2,3,4,5,6],
          a_string: 'string'
        };
        var bad_obj3 = {
          nested_obj_diff: {
            data: 'string',
            other_data: [1,2,3]
          },
          an_array: [1,2,3,4,5,6],
          a_string: 'string'
        };
        var args = get_args(obj);
        var bad_args1 = get_args(bad_obj1);
        var bad_args2 = get_args(bad_obj2);
        var bad_args3 = get_args(bad_obj3);
        var pm = new jsMocha.ParametersMatcher(args);
        expect(pm.match(args)).to(be_true);
        expect(pm.match(bad_args1)).to(be_false);
        expect(pm.match(bad_args2)).to(be_false);
        expect(pm.match(bad_args3)).to(be_false);
      }); // end it
    
      it("should accept a parameter matching block", function(){
        var args = get_args('a string');
        var bad_args = get_args('a string 2');
        var pm = new jsMocha.ParametersMatcher(get_args(function(params){ return params[0] == 'a string' ? true : false; }));
        expect(pm.match(args)).to(be_true);
        expect(pm.match(bad_args)).to(be_false);
      }); // end it
      
    }); // end describe
    
    // describe("matcher", function() {
    //   
    //   it("should generate a report when match fails", function(){
    //     var args1 = get_args('a string');
    //     var bad_args1 = get_args('a string 2');
    //     var pm = new jsMocha.ParametersMatcher(args1);
    //     expect(pm.match(bad_args1)).to(be_false);
    //     expect(pm.report()).to(equal, 'expected ("a string") but got ("a string 2")');
    //   
    //     var args2 = get_args('string 1', 'string 2', 'string 3', 'string 4');
    //     var bad_args2 = get_args('string 1', 'string 4', 'string 3', 'string 2');
    //     var pm2 = new jsMocha.ParametersMatcher(args2);
    //     expect(pm2.match(bad_args2)).to(be_false);
    //     expect(pm2.report()).to(equal, 'expected ("string 1", "string 2", "string 3", "string 4") but got ("string 1", "string 4", "string 3", "string 2")');
    //   }); // end it
    //   
    //   it("should generate a meaningful report when object matching fails", function(){
    //     var obj = {
    //       nested_obj: {
    //         data: 'string',
    //         other_data: [1,2,3]
    //       },
    //       an_array: [1,2,3,4,5,6],
    //       a_string: 'string'
    //     };
    //     var bad_obj = {
    //       nested_obj: {
    //         data: 'string2',
    //         other_data: [1,2,3]
    //       },
    //       an_array: [1,2,3,4,5,6],
    //       a_string: 'string'
    //     };
    //     var args = get_args(obj);
    //     var bad_args = get_args(bad_obj);
    //     var pm = new jsMocha.ParametersMatcher(args);
    //     expect(pm.match(bad_args)).to(be_false);
    //     expect(pm.report()).to(equal, 'expected ({nested_obj:{data:"string", other_data:[1, 2, 3]}, an_array:[1, 2, 3, 4, 5, 6], a_string:"string"}) but got ({nested_obj:{data:"string2", other_data:[1, 2, 3]}, an_array:[1, 2, 3, 4, 5, 6], a_string:"string"})');
    //   }); // end it
    //   
    // }); // end describe

  }); // end describe
}); // end suite
