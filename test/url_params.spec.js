require(['./url_params'], function(urlParams) {

  module('url_params', {});

  test('concatenates correctly', function() {
    var props = {
      one: "one",
      two: "two"
    }
    equal(urlParams(props), '?one=one&two=two');
  });

  test('encode entities', function() {
    var props = {
      one: 'uno',
      two: 'space dos'
    }
    equal(urlParams(props), '?one=uno&two=space%20dos');
  });
});
