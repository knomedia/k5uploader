require([
  'uploader',
  'kaltura_request_builder',
  'kaltura_settings'
], function(Uploader, KalturaRequestBuilder, KalturaSettings) {

  module('KalturaRequestBuilder', {
    setup: function() {
      settings = new KalturaSettings();
      conf = {
        ks: 'ZjE5ZTY2=',
        subp_id: '101',
        partner_id: '11',
        uid: '5_2',
        serverTime: 1389914786
      }
      settings.setConfig(conf)
      requestBuilder = new KalturaRequestBuilder();
      file = new Blob(['hello world'], {type: 'text/plain'});
      requestBuilder.buildRequest(settings, file, 'url');
    }
  });

  test('holds settings, url, and file', function() {
    uploader = new Uploader();
    uploader.send( requestBuilder );
    ok(true);
  });

});
