require(['kaltura_request_builder'], function(KalturaRequestBuilder) {

  module('KalturaRequestBuilder', {
    setup: function() {
      requestBuilder = new KalturaRequestBuilder();
    }
  });

  test('holds settings, url, and file', function() {
    expect(3);
    requestBuilder.buildRequest('set', 'file', 'url');
    equal(requestBuilder.getUrl(), 'url');
    equal(requestBuilder.getFile(), 'file');
    equal(requestBuilder.getSettings(), 'set');
  });


});
