define([
  'uploader',
  'session_manager',
  'kaltura_settings',
  'kaltura_request_builder',
  'message_bus',
  'messenger',
  'underscore'
], function(Uploader,
            SessionManager,
            KalturaSettings,
            KalturaRequestBuilder,
            mBus,
            Messenger,
            _){
  var K5Uploader;

  K5Uploader = (function(){

    K5Uploader.name = 'K5Uploader';

    function K5Uploader (options){
      Messenger.decorate(this);
      this.mergeOptions(options);
      this.buildDependencies();
      this.addListeners();

      this.sessionManager.loadSession(this.options.sessionUrl);
    }

    k5Uploader.prototype.buildDependencies = function() {
      this.sessionManager = new SessionManager();
      this.settings = new KalturaSettings();
      this.kalturaRequest = new KalturaRequestBuilder();
      this.onSessionLoadedBound = this.onSessionLoaded.bind(this);
    };

    K5Uploader.prototype.addListeners = function() {
      mBus.addEventListener('SessionManager.complete', this.onSessionLoadedBound);
      mBus.addEventListener('SessionManager.error', this.onSessionLoadError);
      mBus.addEventListener('Uploader.fail', this.onUploadFail);
      mBus.addEventListener('Uploader.success', this.onUploadSuccess);
      mBus.addEventListener('Uploader.progress', this.onProgress.bind(this));
    };

    K5Uploader.prototype.mergeOptions = function(options) {
      this.options = {
        sessionUrl: '/api/v1/kaltura_session',
        uploadUrl: ''
      }
      this.options = _.defaults(options, this.options)
    };

    K5Uploader.prototype.onProgress = function(e) {
      console.log('Loaded: ' + (e.loaded / e.total * 100) + '%');
      this.dispatchEvent('K5.progress', e, this);
    };

    K5Uploader.prototype.onSessionLoadError = function(e) {
      // TODO: determine how to notify error
      console.log('error loading kaltura session data');
    };

    K5Uploader.prototype.onUploadFail = function(result) {
      console.log('upload error');
      console.log(result);
    };

    K5Uploader.prototype.onUploadSuccess = function(result) {
      console.log('upload success');
      console.log(result);
    };

    K5Uploader.prototype.onSessionLoaded = function(data) {
      this.settings.setConfig(data);
      mBus.removeEventListener('SessionManager.complete', this.onSessionLoadedBound);
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


    // delegate event dispatching to/from the outside world to this messenger
    // K5Uploader.prototype.addEventListener = function(eventName, callback) {
    //   this.messenger.addEventListener(eventName, callback);
    // };

    // K5Uploader.prototype.removeEventListener = function(eventName, targetMethod) {
    //   this.messenger.removeEventListener(eventName, targetMethod);
    // };

    // K5Uploader.prototype.dispatchEvent = function(eventName, data, context) {
    //   this.messenger.dispatchEvent(eventName, data, context);
    // };


    return K5Uploader

  })();

  return  K5Uploader;

});
