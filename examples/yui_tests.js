/* 

// Test Case Template 

YAHOO.qMock.unitTests.singleMethod = new YAHOO.tool.TestCase({

	name: "title of testcase",

	setUp: function() {
	
	},
	tearDown: function() {

	},
	// expected fails or errors
	_should: {
	    fail: {
	        testName: true
	        testName2: true
	    },
	    error: {
	        testGenericError: true, // any error
	        testStringError: "I'm a specific error message.", // error msg
	        testObjectError: new TypeError("Number expected."), // error obj            
	    }
	},
	// All test methods must start with 'test'
	testName: function() {
		
	}
});

*/

myObj = {
	alert_hooray: function(){alert('hooray!')}
	//wierd: function(){},
};

	
YAHOO.namespace("qMock.unitTests");
   
   	YAHOO.qMock.unitTests.singleMethod = new YAHOO.tool.TestCase({

	    name: "mock with single parameterless method (explicit execution call total, no return value)",
    
		setUp: function() {
		},
		
		testMockExisting: function() {
			mock = new Mock(myObj);
			myObj.expects('alert_hooray').times(2).with('some param').returns('a string');
			myObj.alert_hooray(1,2,3,4,5,6);
			//myObj.verify();
		    //assert(mockControl.verify(), "verify() should pass after swing called");
		}
	});
 
	YAHOO.util.Event.onDOMReady(function runTests(){
	    //create the logger
	    var logger = new YAHOO.tool.TestLogger("testLogger");
	    YAHOO.tool.TestRunner.add(YAHOO.qMock.unitTests.singleMethod);
		
	    //run the tests
	    YAHOO.tool.TestRunner.run();
	});