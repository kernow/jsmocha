
jsMochaTests.CardinalityTests = function(Y) {
	var testSuite = new Y.Test.Suite();

	testSuite.add(new Y.Test.Case({
		
		name: "Cardinality",
		
		setUp : function () {
      // this.cardinality = new ExpectationList();
		},
		
		tearDown : function () { 
      // delete this.expectation_list;
		},
		
		testReturnsInstance : function () {
			Y.Assert.isObject(Cardinality.exactly(1));
			Y.Assert.isObject(Cardinality.at_least(1));
			Y.Assert.isObject(Cardinality.at_most(1));
		},
		
		testHasMethods : function () {
			var instance = Cardinality.exactly(1);
			Y.Assert.isFunction(instance.verify);
			Y.Assert.isFunction(instance.allowed_any_number_of_times);
			Y.Assert.isFunction(instance.inspect);
			Y.Assert.isFunction(instance.times);
		},
		
		testExactly : function () {
			var instance = Cardinality.exactly(1);
			Y.Assert.isFalse(instance.verify(0));
			Y.Assert.isTrue(instance.verify(1));
			Y.Assert.isFalse(instance.verify(2));
		},
		
		testAtLeast : function () {
			var instance = Cardinality.at_least(5);
      Y.Assert.isFalse(instance.verify(0));
			Y.Assert.isFalse(instance.verify(1));
			Y.Assert.isFalse(instance.verify(3));
      Y.Assert.isTrue(instance.verify(5));
			Y.Assert.isTrue(instance.verify(6));
			Y.Assert.isTrue(instance.verify(20));
		},
		
		testAtMost : function () {
			var instance = Cardinality.at_most(5);
      Y.Assert.isTrue(instance.verify(0));
			Y.Assert.isTrue(instance.verify(1));
			Y.Assert.isTrue(instance.verify(3));
      Y.Assert.isTrue(instance.verify(5));
			Y.Assert.isFalse(instance.verify(6));
			Y.Assert.isFalse(instance.verify(20));
		},
		
		testAnyNumberOfTimes : function () {
			var instance = Cardinality.at_least(0);
			Y.Assert.isTrue(instance.verify(0));
			Y.Assert.isTrue(instance.verify(1));
			Y.Assert.isTrue(instance.verify(2));
			Y.Assert.isTrue(instance.verify(5000));
		},
		
		testTimes : function () {
			var instance = Cardinality.at_least(5);
      Y.Assert.areEqual('no times', instance.times(0));
      Y.Assert.areEqual('once', instance.times(1));
      Y.Assert.areEqual('twice', instance.times(2));
      Y.Assert.areEqual('3 times', instance.times(3));
      Y.Assert.areEqual('50 times', instance.times(50));
		},
		
		testInspectWithExactly : function () {
			var instance = Cardinality.exactly(5);
      Y.Assert.areEqual('expected exactly 5 times', instance.inspect());
		},
		
		testInspectWithAtLeast : function () {
			var instance = Cardinality.at_least(5);
      Y.Assert.areEqual('expected at least 5 times', instance.inspect());
		},
		
		testInspectWithAtMost : function () {
			var instance = Cardinality.at_most(5);
      Y.Assert.areEqual('expected at most 5 times', instance.inspect());
		},
		
		testInspectWithNever : function () {
			var instance = Cardinality.exactly(0);
      Y.Assert.areEqual('expected never', instance.inspect());
		},
		
		testInspectWithAnyNumberofTimes : function () {
			var instance = Cardinality.at_least(0);
      Y.Assert.areEqual('allowed any number of times', instance.inspect());
		}
		
	}));
	
	return testSuite;
};