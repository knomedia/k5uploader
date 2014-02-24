require(['./k5_options'], function(k5Options) {
  module('k5Options', {
    setup: function() {
    }
  });

  test('handles no entryDefaults object', function() {
    var opts = {};
    k5Options.setOptions(opts);
    ok(k5Options);
  });

  test('allowedMediaTypes', function() {
    expect(3);
    k5Options.setOptions({});
    equal(k5Options.allowedMediaTypes[0], 'video', 'correct defaults');
    equal(k5Options.allowedMediaTypes[1], 'audio', 'correct defaults');
    k5Options.setOptions({
      allowedMediaTypes: 'foo'
    });
    equal(k5Options.allowedMediaTypes, 'foo', 'passed options take precendence');
  });

  test('handles entryDefaults', function() {
    expect(2);
    var opts = {
      entryDefaults: {
        partnerData: 'testing',
        conversionProfile: 0
      }
    };
    k5Options.setOptions(opts);
    equal(k5Options.entryDefaults.partnerData, 'testing');
    equal(k5Options.entryDefaults.conversionProfile, 0);
  });
});
