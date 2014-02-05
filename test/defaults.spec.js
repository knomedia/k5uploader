require(['defaults'], function(defaults) {
  module('defaults', {
  });

  test('keeps default when no key found on options', function() {
    var defaultOptions = {test: true};
    var options = {};
    defaults('test', defaultOptions, options);
    equal(defaultOptions.test, true);
  });

  test('handles undefined options', function() {
    var defaultOptions = {test: true};
    defaults('test', defaultOptions, undefined);
    equal(defaultOptions.test, true);
  });

  test('handles falsy, but present values', function() {
    expect(2)
    var defaultOptions = {test: 0};
    var options = {other: false};
    defaults('test', defaultOptions, options);
    defaults('other', defaultOptions, options);
    equal(defaultOptions.test, 0, 'keeps falsy default value');
    equal(defaultOptions.other, false, 'adds in falsy option');
  });

});
