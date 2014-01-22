require([
  'uploader',
  'kaltura_request_builder',
  'kaltura_settings'
], function(Uploader, KalturaRequestBuilder, KalturaSettings) {

  module('Uploader', {
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

  test('dispatches error messages appropriately', function() {
    //TODO: how to test async upload events
    ok(true);
  });

});
