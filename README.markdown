jsMocha
=======

jsMocha is a JavaScript mocking library that's inspired by [Ruby Mocha Gem](http://mocha.rubyforge.org). It's designed to be test framework agnostic and should work with most testing frameworks. jsMocha was written by [Jamie Dyer](http://kernowsoul.com) while working at [Jiva Technology](http://jivatechnology.com).

Download
--------

Packaged download versions are available on the [github download page](http://github.com/kernow/jsmocha/downloads).

TODO:
-----

- Add stubbing
- Add better parameter matcher reporting of complex objects
- Add support for multiple expects with different `passing()` parameters

Examples
--------

jsMocha's syntax is designed to closely match that of Mocha's which is extremely readable and simple. The major difference between Mocha syntax and jsMocha is `with()` parameter expectations have been changed to `passing()`, this is due to a naming conflict in JavaScript.

A mocked object has the `expects()` method available and also the jsmocha object. The `verify()`, `report()` and `teardown()` methods are available through the jsmocha object to avoid naming conflicts.

### Creating a mock object

Traditional mocking

	var mock = new Mock();
	
To add mocking capabilities to an existing object

	var greeting = {say: function(text){alert(text)}};
	var mock = new Mock(greeting);
	
Mock returns the original object passed to it so in the above example `mock` and `greeting` refer to the same instance of the anonymous object.
	
### Adding an expectation to a mock

	greeting.expects('say');
	
### Specifying the number of times an expectation should be called

	greeting.expects('say'); # expected once
	greeting.expects('say').once(); # expected once
	greeting.expects('say').twice(); # expected 2 times
	greeting.expects('say').never(); # never expected
	greeting.expects('say').times(3); # expected 3 times
	greeting.expects('say').times(0); # never expected
	
### Specifying the expected parameters

The `say()` method should be called with the parameter string 'hello'

	greeting.expects('say').passing('hello');
	
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

Object tear down MUST be called explicitly by calling `report()` or `teardown()`, in the above example this would be done by calling `greeting.jsmocha.report()` or `greeting.jsmocha.teardown()`

License
-------

jsMocha is distributed under the [MIT license](http://www.opensource.org/licenses/mit-license.php)
