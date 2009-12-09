Screw.Matchers["be_an_object"] = {
  match: function(expected, actual) {
    return typeof(actual) == 'object';
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + ' to be an object';
  }
};

Screw.Matchers["be_a_function"] = {
  match: function(expected, actual) {
    return typeof(actual) == 'function';
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + ' to be a function';
  }
};
