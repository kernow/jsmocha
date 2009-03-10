
jsMochaTests.MockTests = function(Y) {
	var testSuite = new Y.Test.Suite("Mock");



	testSuite.add(new Y.Test.Case({
		
		name: "general",
		
		setUp : function () {
			this.mock = new Mock();
		},
		
		tearDown : function () { 
			delete this.mock;
		},
		
		testShouldHaveVerifyMethod : function () {
			Y.Assert.isFunction(this.mock.jsmocha.verify);
		},
		
		testShouldHaveReportMethod : function () {
			Y.Assert.isFunction(this.mock.jsmocha.report);
		},
		
		testShouldHaveTearDownMethod : function () {
			Y.Assert.isFunction(this.mock.jsmocha.teardown);
		},
		
		testShouldReturnExpectedValues : function () {
			this.mock.expects('return_string').returns('string');
			Y.Assert.areEqual('string', this.mock.return_string());
			
			var array = new Array(1,2,3,4);
			this.mock.expects('return_array').returns(array);
			Y.Assert.areEqual(array, this.mock.return_array());
			
			var obj = {data: 'string'};
			this.mock.expects('return_object').returns(obj);
			Y.Assert.areEqual(obj, this.mock.return_object());
		},
		
		testShouldInvokeOnce : function () {
			this.mock.expects('a_method');
			Y.Assert.isFalse(this.mock.jsmocha.verify());
			this.mock.a_method();
			Y.Assert.isTrue(this.mock.jsmocha.verify());
			this.mock.expects('another_method').once();
			Y.Assert.isFalse(this.mock.jsmocha.verify());
			this.mock.another_method();
			Y.Assert.isTrue(this.mock.jsmocha.verify());
		},
		
		testShouldInvokeTwice : function () {
			this.mock.expects('a_method').twice();
			Y.Assert.isFalse(this.mock.jsmocha.verify());
			this.mock.a_method();
			Y.Assert.isFalse(this.mock.jsmocha.verify());
			this.mock.a_method();
			Y.Assert.isTrue(this.mock.jsmocha.verify());
		},
		
		testShouldInvokeNever : function () {
			this.mock.expects('a_method').never();
			Y.Assert.isTrue(this.mock.jsmocha.verify());
			this.mock.a_method();
			Y.Assert.isFalse(this.mock.jsmocha.verify());
		},
		
		testShouldInvokeTimes : function () {
			this.mock.expects('a_method').times(3);
			Y.Assert.isFalse(this.mock.jsmocha.verify());
			this.mock.a_method();
			Y.Assert.isFalse(this.mock.jsmocha.verify());
			this.mock.a_method();
			Y.Assert.isFalse(this.mock.jsmocha.verify());
			this.mock.a_method();
			Y.Assert.isTrue(this.mock.jsmocha.verify());
		}
	}));
	
	
	
	testSuite.add(new Y.Test.Case({
		
		name: "with",
		
		setUp : function () {
			this.mock = new Mock();
		},
		
		tearDown : function () { 
			delete this.mock;
		},
		
		testShouldPassValidation : function () {
			this.mock.expects('a_method').with('a string');
			this.mock.a_method('a string');
			Y.Assert.isTrue(this.mock.jsmocha.verify());
		},
		
		testShouldFailValidationWhenNoParamsPassed : function () {
			this.mock.expects('a_method').with('a string');
			this.mock.a_method();
			Y.Assert.isFalse(this.mock.jsmocha.verify());
		},
		
		testShouldFailValidationWhenDifferentParamsPassed : function () {
			this.mock.expects('a_method').with('a string');
			this.mock.a_method('another string');
			Y.Assert.isFalse(this.mock.jsmocha.verify());
		},
		
		testShouldFailValidationWhenDifferntTypeOfParamsPassed : function () {
			this.mock.expects('a_method').with('a string');
			this.mock.a_method([1,2,3]);
			Y.Assert.isFalse(this.mock.jsmocha.verify());
		},
		
	}));
	
	
	
	
	testSuite.add(new Y.Test.Case({
		
		name: "restore",
		
		setUp : function () {
			this.mock = {
				a_method: function(){
					return 'original';
				}
			};
			new Mock(this.mock);
		},
		
		tearDown : function () { 
			delete this.mock;
		},
		
		testShouldRestoreMock : function () {
			this.mock.expects('a_method').returns('mocked');
			Y.Assert.areEqual('mocked', this.mock.a_method());
			this.mock.jsmocha.teardown(this.mock.jsmocha);
			Y.Assert.areEqual('original', this.mock.a_method());
		},
		
		testShouldRemoveMethods : function () {
			this.mock.jsmocha.teardown(this.mock.jsmocha);
			Y.Assert.isUndefined(this.mock.expects);
			Y.Assert.isUndefined(this.mock.jsmocha);
		},
		
	}));
	



	testSuite.add(new Y.Test.Case({
		
		name: "with no existing object",
		
		setUp : function () {
			this.mock = new Mock();
		},
		
		tearDown : function () { 
			delete this.mock;
		},
		
		testShouldCreateNewObject : function () {
			Y.Assert.isObject(this.mock);
		},
		
		testShouldHaveExpectsMethod : function () {
			Y.Assert.isFunction(mock.expects);
		},
		
		testShouldHaveJsmochaObject : function () {
			Y.Assert.isObject(mock.jsmocha);
		},
		
		testShouldReturnExistingMockIfMockedTwice : function () {
			mock2 = new Mock(this.mock);
			// not sure how to test this, a clash error is thrown if this fails
			Y.Assert.areSame(mock, mock2);
		}
	}));
	
	
	
	
	testSuite.add(new Y.Test.Case({
		
		name: "with existing object",
		
		setUp : function () {
			function AnObject(){
				this.a_method = function(){
					alert('a_method called');
				};
			};
			this.obj = new AnObject();
		},
		
		tearDown : function () { 
			delete this.obj;
			delete this.bad_obj;
		},
		
		testShouldCreateNewObject : function () {
			mock = new Mock(this.obj);
			Y.Assert.isObject(mock);
		},
		
		testShouldHaveExpectsMethod : function () {
			mock = new Mock(this.obj);
			Y.Assert.isFunction(mock.expects);
		},
		
		testShouldHaveJsmochaObject : function () {
			mock = new Mock(this.obj);
			Y.Assert.isObject(mock.jsmocha);
		},
		
		testShouldReturnExistingMockIfMockedTwice : function () {
			mock = new Mock(this.obj);
			mock2 = new Mock(this.obj);
			// not sure how to test this, a clash error is thrown if this fails
			Y.Assert.areSame(mock, mock2);
		}
		
	}));
	
	
	
	
	testSuite.add(new Y.Test.Case({
		
		name: "bad mocks",
		
		_should: {
            error: {
                testShouldCheckTypeOfMock: true,
				testShouldNotAllowFunctions: true,
				testShouldCheckForExpectsNameClash: true
            }
        },

		testShouldCheckForExpectsNameClash : function () {
			function BadExpectsObject(){
				this.expects = function(){
					alert('expects called');
				};
			};
			var bad_obj = new BadExpectsObject();
			new Mock(bad_obj);
		},

		testShouldCheckTypeOfMock : function () {
			new Mock('a string');
		},
		
		testShouldNotAllowFunctions : function () {
			new Mock(function(){});
		}
		
		// need to add tests for Array's and Date's as these have a typeof Object
		
	}));
	
	
	
	
	return testSuite;
};
