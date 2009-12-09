Screw.Matchers["throw_exception"] = {
  match: function(expected, actual) {
    var exception_thrown = false;
    try {
      actual();
    } catch(e) {
      exception_thrown = true;
    }
    return exception_thrown;
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' to not ' : ' to ') + 'throw an exception';
  }
};
