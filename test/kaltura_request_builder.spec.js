require(['kaltura_request_builder'], function(KalturaRequestBuilder) {

  module('KalturaRequestBuilder', {
    setup: function() {
      requestBuilder = new KalturaRequestBuilder();
    }
  });

  test('holds settings, url, and file', function() {
    expect(3);
    var session = {
      getSession: function() {
        return {ks: '5678909876'}
      }
    };
    var file = {};
    var xhr = requestBuilder.buildRequest(session, file);
    equal(requestBuilder.getFile(), file);
    equal(requestBuilder.getSettings(), session);
    equal((xhr instanceof XMLHttpRequest), true, 'returns an xhr');
  });


});
