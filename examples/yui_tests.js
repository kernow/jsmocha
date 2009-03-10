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

// START debugging functions 
function inspect(obj, maxLevels, level)
{
 var str = '', type, msg;

   // Start Input Validations
   // Don't touch, we start iterating at level zero
   if(level == null)  level = 0;

   // At least you want to show the first level
   if(maxLevels == null) maxLevels = 1;
   if(maxLevels < 1)    
       return '<font color="red">Error: Levels number must be > 0</font>';

   // We start with a non null object
   if(obj == null)
   return '<font color="red">Error: Object <b>NULL</b></font>';
   // End Input Validations

   // Each Iteration must be indented
   str += '<ul>';

   // Start iterations for all objects in obj
   for(property in obj)
   {
     try
     {
         // Show "property" and "type property"
         type =  typeof(obj[property]);
         str += '<li>(' + type + ') ' + property +
                ( (obj[property]==null)?(': <b>null</b>'):('')) + '</li>';

         // We keep iterating if this property is an Object, non null
         // and we are inside the required number of levels
         if((type == 'object') && (obj[property] != null) && (level+1 < maxLevels))
         str += inspect(obj[property], maxLevels, level+1);
     }
     catch(err)
     {
       // Is there some properties in obj we can't access? Print it red.
       if(typeof(err) == 'string') msg = err;
       else if(err.message)        msg = err.message;
       else if(err.description)    msg = err.description;
       else                        msg = 'Unknown';

       str += '<li><font color="red">(Error) ' + property + ': ' + msg +'</font></li>';
     }
   }

     // Close indent
     str += '</ul>';

   return str;
}

// END debugging functions 

Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};

function obj_the_same (firstObj, secondObj) {
	for (var objInd in firstObj) {
	    if (typeof(firstObj[objInd]) == 'object') {
			if(secondObj[objInd]){
	        	if(obj_the_same(firstObj[objInd], secondObj[objInd]) == false){
					return false;
				}
			} else {
				return false;
			}
	    } else {
			if(secondObj[objInd] == false){
				return false;
			}
	    }
	}
	return true;
}




function Something(){};
Something.prototype = {
	alert_hooray: function(){alert('hooray!')},
	alert_boo: function(){alert('boo!')}
};
Something.prototype.constructor = Something;
o = new Something();
console.log(o.constructor);




YAHOO.namespace("qMock.unitTests");
   
   	YAHOO.qMock.unitTests.singleMethod = new YAHOO.tool.TestCase({

	    name: "mock with single parameterless method (explicit execution call total, no return value)",
    
		setUp: function() {
		},
		
		testMockExisting: function() {
			//myObj = new Something();
			myObj = new Mock(new Something());
			myObj.expects('alert_hooray').once().with(1,2).returns('a string');
			myObj.expects('alert_boo').once().with('skdfsd').returns('a string');
			myObj.alert_hooray(1,22);
			myObj.alert_boo('skdfsd');
		    assert(myObj.jsmocha.verify(), myObj.jsmocha.report());
		}
	});
 
	YAHOO.util.Event.onDOMReady(function runTests(){
	    //create the logger
	    var logger = new YAHOO.tool.TestLogger("testLogger");
	    YAHOO.tool.TestRunner.add(YAHOO.qMock.unitTests.singleMethod);
		
	    //run the tests
	    YAHOO.tool.TestRunner.run();
	});