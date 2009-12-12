Screw.Matchers["be_an_object"] = {
  match: function(expected, actual) {
    return actual && typeof actual === 'object';
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' to not ' : ' to ') + 'be an object';
  }
};

Screw.Matchers["be_a_function"] = {
  match: function(expected, actual) {
    return $.isFunction(actual);
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' to not ' : ' to ') + 'be a function';
  }
};

Screw.Matchers["be_an_array"] = {
  match: function(expected, actual) {
    return $.isArray(actual);
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' to not ' : ' to ') + 'be an array';
  }
};

Screw.Matchers["be_a_string"] = {
  match: function(expected, actual) {
    return typeof actual === 'string';
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' to not ' : ' to ') + 'be a string';
  }
};
