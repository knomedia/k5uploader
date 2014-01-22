require(['k5uploader'], function(K5Uploader) {
  module('K5Uploader Sanity', {
    setup: function() {
    }
  });

  test('sanity', function() {
    var opts = {
      sessionUrl: 'http://localhost:3000/proxy/kaltura_session',
      uploadUrl: 'http://localhost:3000/proxy',
    }
    var ku = new K5Uploader(opts);
    ok( ku );
  });
});
