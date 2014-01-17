define([
  'uploader',
  'session_manager',
  'kaltura_settings',
  'kaltura_request_builder',
  'message_bus',
  'underscore'
], function(Uploader,
            SessionManager,
            KalturaSettings,
            KalturaRequestBuilder,
            mBus,
            _){
  var K5Uploader;

  K5Uploader = (function(){

    K5Uploader.name = 'K5Uploader';

    function K5Uploader (options){
      this.mergeOptions(options);
      this.sessionManager = new SessionManager();
      this.settings = new KalturaSettings();
      this.kalturaRequest = new KalturaRequestBuilder();
      this.onSessionLoadedBound = this.onSessionLoaded.bind(this);
      mBus.addListener('SessionManager.complete', this.onSessionLoadedBound);

      this.sessionManager.loadSession(this.options.sessionUrl);
    }

    K5Uploader.prototype.mergeOptions = function(options) {
      this.options = {
        sessionUrl: '/api/v1/kaltura_session',
        uploadUrl: ''
      }
      this.options = _.defaults(options, this.options)
    };

    K5Uploader.prototype.onSessionLoaded = function(data) {
      this.settings.setConfig(data);
      mBus.removeListener('SessionManager.complete', this.onSessionLoadedBound);
      this.sessionManager = null;
      this.onReady();
    };

    K5Uploader.prototype.onReady = function() {
      console.log('default onReady, you will want to override this');
    };

    K5Uploader.prototype.uploadFile = function(file) {
      this.kalturaRequest.buildRequest(this.settings, file, this.options.uploadUrl);
      this.uploader = new Uploader();
      this.uploader.send(this.kalturaRequest);
    };


    return K5Uploader

  })();

  return  K5Uploader;

});
