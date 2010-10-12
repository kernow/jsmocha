beforeEach(function() {
  this.addMatchers({
    toBeAnObject: function() {
       return this.actual && typeof this.actual === 'object';
    },
    toBeAFunction: function() {
      return $.isFunction(this.actual);
    },
    toBeAString: function() {
      return typeof this.actual === 'string';
    }
  });
});
