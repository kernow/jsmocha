Screw.Matchers["be_identical_to"] = {
  match: function(expected, actual) {
    return actual === expected;
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' to not ' : ' to ') + 'be identical to ' + $.print(expected);
  }
};
