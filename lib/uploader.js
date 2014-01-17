define(['message_bus'], function(mBus){
  var Uploader;

  Uploader = (function(){
    Uploader.name = 'Uploader';

    function Uploader (){
      this.xhr = new XMLHttpRequest();
    }

    Uploader.prototype.isAvailable = function() {
      return !!(this.xhr.upload)
    };

    Uploader.prototype.send = function(kalturaRequest) {
      this.xhr = kalturaRequest.createRequest();
      this.addListeners();
      this.xhr.send(kalturaRequest.createFormData());
    };


    Uploader.prototype.addListeners = function() {
      this.xhr.upload.addEventListener('progress', this.eventProxy.bind(this.xhr));
      this.xhr.upload.addEventListener('load', this.eventProxy.bind(this.xhr));
      this.xhr.upload.addEventListener('error', this.eventProxy.bind(this.xhr));
      this.xhr.upload.addEventListener('abort', this.eventProxy.bind(this.xhr));
      this.xhr.onload = this.onload.bind(this)
    };

    Uploader.prototype.onload = function(event) {
      debugger
    };

    Uploader.prototype.eventProxy = function(event) {
      var name = 'Uploader.' + event.type;
      mBus.dispatchEvent(name, event, this);
    };

    return Uploader

  })();

  return  Uploader;

});
