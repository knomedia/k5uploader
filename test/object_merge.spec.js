require(['object_merge'], function(objectMerge) {
  module('object_merge', {});

  test('returns undefined when no argument', function() {
    equal(objectMerge(), undefined);
  });

  test('combines object props to new object', function() {
    expect(3);
    var first = {one: 'uno'};
    var second = {two: 'dos'};
    var third = {three: 'tres'};
    var result = objectMerge([first, second, third]);
    equal(result.one, 'uno', 'combines all props');
    equal(result.two, 'dos', 'combines all props');
    equal(result.three, 'tres', 'combines all props');
  });

  test('order precendence', function() {
    var first = {key: 'uno'};
    var second = {key: 'dos'};
    var third = {key: 'tres'};
    var result = objectMerge([first, second, third]);
    equal(result.key, 'uno', 'first item in argument array gets precendence');
  });

});
