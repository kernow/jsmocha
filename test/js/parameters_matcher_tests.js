
jsMochaTests.ParametersMatcherTests = function(Y) {
	var testSuite = new Y.Test.Suite();

	testSuite.add(new Y.Test.Case({
		
		name: "Parameters Matcher",
		
		setUp : function () {
			this.get_args = function(){return(arguments)};
		},
		
		tearDown : function () { 
			delete this.get_args;
		},
		
		testCanMatchAString : function () {
			var args = this.get_args('a string');
			var bad_args = this.get_args('a string 2');
			var pm = new ParametersMatcher(args);
			Y.Assert.isTrue(pm.match(args));
			Y.Assert.isFalse(pm.match(bad_args));
		},
		
		testCanMatchMultipleStrings : function () {
			var args = this.get_args('string 1', 'string 2', 'string 3', 'string 4');
			var bad_args = this.get_args('string 1', 'string 4', 'string 3', 'string 2');
			var pm = new ParametersMatcher(args);
			Y.Assert.isTrue(pm.match(args));
			Y.Assert.isFalse(pm.match(bad_args));
		},
		
		testCanMatchAnArray : function () {
			var args = this.get_args([1,2,3,4]);
			var bad_args = this.get_args([3,2,1,4]);
			var pm = new ParametersMatcher(args);
			Y.Assert.isTrue(pm.match(args));
			Y.Assert.isFalse(pm.match(bad_args));
		},
		
		testCanMatchArraysOfDifferentLengths : function () {
			var args = this.get_args([1,2,3,4,5,6]);
			var bad_args1 = this.get_args([3,2,1,4]);
			var bad_args2 = this.get_args([3,2,1,4,5,6,7,8]);
			var pm = new ParametersMatcher(args);
			Y.Assert.isFalse(pm.match(bad_args1));
			Y.Assert.isFalse(pm.match(bad_args2));
		},
		
		testCanMatchMultipleArrays : function () {
			var args = this.get_args([1,2,3,4],[5,6,7,8],[9,10,11,12]);
			var bad_args1 = this.get_args([1,2,3,4],[5,4,7,8],[9,10,11,12]);
			var bad_args2 = this.get_args([1,9,3,4],[5,4,7,8],[9,10,11,12]);
			var bad_args3 = this.get_args([1,2,3,4],[5,4,7,8],[9,10,6,12]);
			var pm = new ParametersMatcher(args);
			Y.Assert.isTrue(pm.match(args));
			Y.Assert.isFalse(pm.match(bad_args1));
			Y.Assert.isFalse(pm.match(bad_args2));
			Y.Assert.isFalse(pm.match(bad_args3));
		},
		
		testCanMatchAnObject : function () {
			var args = this.get_args({data: 'string'});
			var bad_args1 = this.get_args({data: 'string 2'});
			var bad_args2 = this.get_args({data: 'string', other_data: [1,2,3]});
			var pm = new ParametersMatcher(args);
			Y.Assert.isTrue(pm.match(args));
			Y.Assert.isFalse(pm.match(bad_args1));
			Y.Assert.isFalse(pm.match(bad_args2));
		},
		
		testCanMatchMultipleObjects : function () {
			var args = this.get_args({data: 'string'},{data: 'another string'});
			var bad_args1 = this.get_args({data: 'string 2'},{data: 'another string'});
			var bad_args2 = this.get_args({data: 'string'},{data: 'another string 2'});
			var bad_args3 = this.get_args({data: 'string'},{data_string: 'another string'});
			var pm = new ParametersMatcher(args);
			Y.Assert.isTrue(pm.match(args));
			Y.Assert.isFalse(pm.match(bad_args1));
			Y.Assert.isFalse(pm.match(bad_args2));
			Y.Assert.isFalse(pm.match(bad_args3));
		},
		
		testCanMatchComplexObjects : function () {
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
			var args = this.get_args(obj);
			var bad_args1 = this.get_args(bad_obj1);
			var bad_args2 = this.get_args(bad_obj2);
			var bad_args3 = this.get_args(bad_obj3);
			var pm = new ParametersMatcher(args);
			Y.Assert.isTrue(pm.match(args));
			Y.Assert.isFalse(pm.match(bad_args1));
			Y.Assert.isFalse(pm.match(bad_args2));
			Y.Assert.isFalse(pm.match(bad_args3));
		},
		
	}));
	
	// report tests
	testSuite.add(new Y.Test.Case({
		
		name: "Parameters Matcher Reports",
		
		setUp : function () {
			this.get_args = function(){return(arguments)};
		},
		
		tearDown : function () { 
			delete this.get_args;
		},
		
		testShouldGenerateAReportWhenInvalid : function () {
			var args1 = this.get_args('a string');
			var bad_args1 = this.get_args('a string 2');
			var pm = new ParametersMatcher(args1);
			Y.Assert.isFalse(pm.match(bad_args1));
			Y.Assert.areEqual('expected (a string) but got (a string 2)', pm.report());
			
			var args2 = this.get_args('string 1', 'string 2', 'string 3', 'string 4');
			var bad_args2 = this.get_args('string 1', 'string 4', 'string 3', 'string 2');
			var pm2 = new ParametersMatcher(args2);
			Y.Assert.isFalse(pm2.match(bad_args2));
			Y.Assert.areEqual('expected (string 1, string 2, string 3, string 4) but got (string 1, string 4, string 3, string 2)', pm2.report());
		},
		
		// testShouldGenerateMeaningfulReportFromObjectParameters : function () {
		// 	var obj = {
		// 		nested_obj: {
		// 			data: 'string',
		// 			other_data: [1,2,3]
		// 		},
		// 		an_array: [1,2,3,4,5,6],
		// 		a_string: 'string'
		// 	};
		// 	var bad_obj = {
		// 		nested_obj: {
		// 			data: 'string2',
		// 			other_data: [1,2,3]
		// 		},
		// 		an_array: [1,2,3,4,5,6],
		// 		a_string: 'string'
		// 	};
		// 	var args = this.get_args(obj);
		// 	var bad_args = this.get_args(bad_obj);
		// 	var pm = new ParametersMatcher(args);
		// 	Y.Assert.isFalse(pm.match(bad_args));
		// 	Y.Assert.areEqual('rrrrrrr', pm.report());
		// },
		
	}));
	
	return testSuite;
};
