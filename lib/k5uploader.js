define([
  'uploader',
  'session_manager',
  'kaltura_settings',
  'kaltura_request_builder',
  'message_bus',
  'messenger',
  'entry_service',
  'uiconf_service',
  'defaults'
], function(Uploader,
            SessionManager,
            KalturaSettings,
            KalturaRequestBuilder,
            mBus,
            Messenger,
            EntryService,
            UiconfService,
            defaults){
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

    K5Uploader.prototype.buildDependencies = function() {
      this.sessionManager = new SessionManager();
      this.settings = new KalturaSettings();
      this.kalturaRequest = new KalturaRequestBuilder();
      this.entryService = new EntryService(this.options.entryUrl);
      this.uiconfService = new UiconfService();
      this.onSessionLoadedBound = this.onSessionLoaded.bind(this);
    };

    K5Uploader.prototype.addListeners = function() {
      mBus.addEventListener('SessionManager.complete', this.onSessionLoadedBound);
      mBus.addEventListener('SessionManager.error', this.onSessionLoadError.bind(this));
      mBus.addEventListener('UiConf.error', this.onUiConfError.bind(this));
      mBus.addEventListener('UiConf.complete', this.onUiConfComplete.bind(this));
      mBus.addEventListener('Uploader.error', this.onUploadError.bind(this));
      mBus.addEventListener('Uploader.success', this.onUploadSuccess.bind(this));
      mBus.addEventListener('Uploader.progress', this.onProgress.bind(this));

      mBus.addEventListener('Entry.success', this.onEntrySuccess.bind(this));
      mBus.addEventListener('Entry.fail', this.onEntryFail.bind(this));
    };

    K5Uploader.prototype.mergeOptions = function(options) {
      this.options = {
        sessionUrl: '/api/v1/kaltura_session',
        uploadUrl: '',
        entryUrl: '',
        uiconfUrl: ''
      }
      defaults('sessionUrl', this.options, options);
      defaults('uploadUrl', this.options, options);
      defaults('entryUrl', this.options, options);
      defaults('uiconfUrl', this.options, options);
    };

    K5Uploader.prototype.onSessionLoaded = function(data) {
      this.settings.setConfig(data);
      mBus.removeEventListener('SessionManager.complete', this.onSessionLoadedBound);
      this.sessionManager = null;
      this.loadUiConf();
      //this.dispatchEvent("K5.ready", data, this);
    };

    K5Uploader.prototype.onEntrySuccess = function(data) {
      this.dispatchEvent('K5.complete', data, this);
    };

    K5Uploader.prototype.onEntryFail = function(data) {
      this.dispatchEvent('K5.error', data, this);
    };
    K5Uploader.prototype.onUiConfError = function(result) {
      this.dispatchEvent('K5.error', result, this);
    };

    K5Uploader.prototype.onUiConfComplete = function(result) {
      this.dispatchEvent("K5.ready", {}, this);
    };

    K5Uploader.prototype.loadUiConf = function() {
      this.uiconfService.load(this.options.uiconfUrl, this.settings);
    };

    K5Uploader.prototype.uploadFile = function(file) {
      this.kalturaRequest.buildRequest(this.settings, file, this.options.uploadUrl);
      this.uploader = new Uploader();
      this.uploader.send(this.kalturaRequest);
    };

    // Delegate to publicly available K5 events
    K5Uploader.prototype.onProgress = function(e) {
      this.dispatchEvent('K5.progress', e, this);
    };

    K5Uploader.prototype.onSessionLoadError = function(e) {
      this.dispatchEvent('K5.sessionError', e, this);
    };

    K5Uploader.prototype.onUploadError = function(result) {
      this.dispatchEvent('K5.error', result, this);
    };

    K5Uploader.prototype.onUploadSuccess = function(result) {
      //this.dispatchEvent('K5.success', result, this);
      // TODO: send result.asEntryParams, and settings to addEntry
      this.entryService.addEntry(result, this.settings);
    };

    return K5Uploader

  })();

  return  K5Uploader;

});
