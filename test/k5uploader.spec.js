require(['k5uploader'], function(K5Uploader) {
  module('K5Uploader Sanity', {
    setup: function() {
    }
  });

  test('sanity', function() {
    var ku = new K5Uploader();
    ok( ku );
  });
});
