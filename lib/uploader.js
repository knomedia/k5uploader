define([
  'message_bus',
  'upload_result'
], function(mBus, UploadResult){
  var Uploader;

  Uploader = (function(){
    Uploader.name = 'Uploader';

    function Uploader (){
      this.xhr = new XMLHttpRequest();
      this.uploadResult = new UploadResult();
    }

    Uploader.prototype.isAvailable = function() {
      return !!(this.xhr.upload)
    };

    Uploader.prototype.send = function(kalturaRequest) {
      this.xhr = kalturaRequest.createRequest();
      this.addEventListeners();
      this.xhr.send(kalturaRequest.createFormData());
    };


    Uploader.prototype.addEventListeners = function() {
      this.xhr.upload.addEventListener('progress', this.eventProxy.bind(this.xhr));
      this.xhr.upload.addEventListener('load', this.eventProxy.bind(this.xhr));
      this.xhr.upload.addEventListener('error', this.eventProxy.bind(this.xhr));
      this.xhr.upload.addEventListener('abort', this.eventProxy.bind(this.xhr));
      this.xhr.onload = this.onload.bind(this)
    };

    Uploader.prototype.onload = function(event) {
      this.uploadResult.parseXML(this.xhr.response);
      var resultStatus = (this.uploadResult.isError)? 'error' : 'success';
      mBus.dispatchEvent('Uploader.' + resultStatus , this.uploadResult);
    };

    Uploader.prototype.eventProxy = function(event) {
      var name = 'Uploader.' + event.type;
      mBus.dispatchEvent(name, event, this);
    };

    return Uploader

  })();

  return  Uploader;

});
