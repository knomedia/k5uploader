require(['./k5uploader'], function(K5Uploader) {
  module('K5Uploader Sanity', {
    setup: function() {
    }
  });

  test('sanity', function() {
    var opts = {
      sessionUrl: 'http://localhost:3000/proxy/kaltura_session',
      uploadUrl: 'http://localhost:3000/proxy',
    }
    // TODO: mock services and do a high level integration test
    ok( true );
  });
});
