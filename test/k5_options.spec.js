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
