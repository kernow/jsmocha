jsMocha
=======

[jsMocha](http://kernowsoul.com/page/jsmocha) is a JavaScript mocking library inspired by the [Ruby Mocha Gem](http://mocha.rubyforge.org). It's designed to be test framework agnostic so should work with most testing frameworks. jsMocha was written by [Jamie Dyer](http://kernowsoul.com) while working at [Jiva Technology](http://jivatechnology.com).

Download
--------

Packaged download versions are available on the [github download page](http://github.com/kernow/jsmocha/downloads). If you have ruby installed and want to build your own version from source run `rake js:build` in the project folder to generate the built jsmocha.js file.

Future Plans
------------

- Integrated support for testing frameworks
- Add parameter matching helpers
- Add spying support
- Add support for multiple expects with different `passing()` parameters

Platform support
----------------

jsMocha has been tested on Firefox 3, Safari 4 and Google Chrome. Internet Explorer 8 is supported, however the mockerize feature is currently unsupported.

Using jsMocha
-------------

jsMocha supports both creating pure mock objects as well as adding mocking to abilities existing objects. This allows mocking in the more traditional form where mock objects are used in conjunction with dependancy injection as well as the more modern style where mocking is added to real objects.

A mocked object has the `expects()` and `stubs()` methods available on it. These are used to create exceptions or to stub methods. Additionally the jsmocha object is available on a mocked object, this includes the methods `verify()`, `report()` and `teardown()`. These methods are namespaced within jsmocha to avoid any naming conflicts. There are only 3 reserved names when mocking object in jsMocha, these are expects, stubs and jsmocha, you will be unable to mock any objects that uses one of these reserved words.

### Creating a mock object

Traditional mocking, this creates a pure mock object

	var mock = new Mock();
	
To add mocking capabilities to an existing object

	var greeting = { say: function(text){ alert(text) }};
	var mock = new Mock(greeting);
	
Or a function

        var greeting = function(){ this.say = function(text){ alert(text) }};
        var mock = new Mock(greeting);
	
A call to `Mock()` returns the object passed to it so in the above examples `mock` and `greeting` refer to the same thing.
	
### Adding an expectation to a mock

	greeting.expects('say');
	
We have now set the expectation that `greeting.say()` should be called one time
	
### Specifying the number of times a method should be called

	greeting.expects('say'); # expected once
	greeting.expects('say').once(); # expected once
	greeting.expects('say').twice(); # expected 2 times
	greeting.expects('say').never(); # never expected
	greeting.expects('say').times(3); # expected 3 times
	greeting.expects('say').times(0); # never expected
	greeting.expects('say').at_least(3); # expected 3 or more times
	greeting.expects('say').at_most(3); # expected 3 times or less
	
When adding an expectation the default number of invocations expected is 1, so `greeting.expects('say')` and `greeting.expects('say').once()` are the same. There's a bunch of convenience methods for specifying the number of times a method is expected to be invoked.
	
### Specifying the expected parameters

The `say()` method should be called with the parameter string 'hello'

	greeting.expects('say').passing('hello');
	
The `say()` method should be called with the parameters 'hello' and 'world'

	greeting.expects('say').passing('hello', 'world');

Any number of parameters can be matched as well as any type of parameter. If you need to match complex parameters you can pass a code block to the `passing()` method, a parameters array is passed to the block. The matcher block can then be as complex as is needed to verify the correct parameters were received, the matcher block must return true or false depending on a successful or unsuccessful match. For example, to check that the first parameter is the string 'hello'

	greeting.expects('say').passing(function(params){ return params[0] == 'hello' ? true : false; });
	
### Specifying what the mock should return

The method `say()` should return the string 'greeting sent'

	greeting.expects('say').returns('greeting sent');
	
A mock can return a different value each time it's called by passing multiple values to `returns()`

	greeting.expects('say').returns('greeting sent once', 'greeting sent twice', 'greeting sent three times');
	greeting.say('hello'); # returns 'greeting sent once'
	greeting.say('hello'); # returns 'greeting sent twice'
	greeting.say('hello'); # returns 'greeting sent three times'
	greeting.say('hello'); # returns 'greeting sent three times', the last value will be returned for any subsequent calls
	
### Stringing expectations together

jsMocha is designed so that expectations can be strung together neatly

	greeting.expects('say').twice().passing('hello').returns('greeting sent');
	
This would specify the say method should be called twice with the parameter 'hello' and will return 'greeting sent'

### Verifying expectations

	greeting.jsmocha.verify();
	
Returns `true` or `false`

### Getting the expectation report

	greeting.jsmocha.report();
	
Returns a report of all failed expectations.

### Resetting mocked objects, teardown

After you have finished mocking and verifying expectations of a mocked object it needs to be returned to it's original state. This can be done by either calling `report()` or `teardown()`, in the above example this would be done by calling `greeting.jsmocha.report()` or `greeting.jsmocha.teardown()`. There is also a third way to tear down by calling the class method `Mock.teardown_all()`, this returns all mocked objects to their original state.

### Stubbing

jsMocha also supports stubbing, a stub has no expectations associated with it so can be used to stop a method performing an action such as maching a call to a remote service. To stub a method

	greeting.stubs('say');
	
`greeting.say()` can now be called any number of times, calls are received by jsMocha rather than the original object.

Subs can also return data just like mocks

	greeting.stubs('say').returns('a string');
	greeting.stubs('say').returns(1, 2, 3, 4);
	
You must still call the `report()`, `teardown()` or `Mock.teardown_all()` methods to return stubbed objects back to their original state.

### Some jsMocha magic

Using the above techniques in order to mock an object and run the verification you would need to write several lines of code

	var greeting = { say: function(text){ alert(text) }};
	var mock = new Mock(greeting);
	greeting.expects('say');
	greeting.jsmocha.verify(); # the result would be passed to a testing framework
	greeting.jsmocha.report(); # again the result would be passed to a testing framework to display any errors

Thats far too much code, mocha has some special methods that allow you to cut down on the amount of code needed

	Mock.mockerize()
  
`mockerize()` is a neat feature that adds mocking and subbing capabilities to all objects and functions. What this means is you can call `greeting.expects('say')` without needing to tell jsMocha you want to mock it before hand. When combining this with the `Mock.mocked_objects` array it's possible to create auto setup and verification if your testing frameworks supports global before and after blocks. To achieve this with Screw.unit

	Mock.mockerize();
	
	Screw.Unit(function() {
		after(function(){
			$(Mock.mocked_objects).each(function(i, obj){
				expect(obj).to(verify_to, true);
			});
		});
	});

This allows you to write the above test case with only 1 line of mocking code

	var greeting = { say: function(text){ alert(text) }};
	greeting.expects('say');
  
Mocking is already setup on all all objects so there is no need to initialize a new mock object and the expectations are automatically verified in Screw.unit's after block.

Of course all this power has a downside, the expects and stubs methods are added to all objects and functions as well as the jsmocha object. If you don't like libraries extending native JavaScript objects don'e use the `mockerize()` method and stick to setting up mocks manually. You can of course still use the auto verification safely saving on manually writing verifications.

License
-------

jsMocha is distributed under the [MIT license](http://www.opensource.org/licenses/mit-license.php)
