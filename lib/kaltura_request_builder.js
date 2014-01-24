define([], function(){
  var KalturaRequestBuilder;

  KalturaRequestBuilder = (function(){
    KalturaRequestBuilder.name = 'KalturaRequestBuilder';

    function KalturaRequestBuilder (){
      this.settings,
      this.url,
      this.file;
      this.xhr;
    }

    KalturaRequestBuilder.prototype.createRequest = function() {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", this.url, true);
      xhr.responseType = 'xml'
      return xhr;
    };

    KalturaRequestBuilder.prototype.createFormData = function() {
      var formData = new FormData();
      var kalturaSettings = this.settings.getConfig();
      for( prop in kalturaSettings ) {
        formData.append(prop, kalturaSettings[prop]);
      }
      // TODO: determine how kaltura wants this attached
      formData.append('Filename', this.file);
      formData.append('filename', this.createFileId());
      return formData;
    };

    KalturaRequestBuilder.prototype.createFileId = function() {
      Date.now().toString();
    };

    KalturaRequestBuilder.prototype.buildRequest = function(settings, file, url) {
      this.settings = settings;
      this.file = file;
      this.url = url;
    };

    KalturaRequestBuilder.prototype.getUrl = function() {
      return this.url;
    };

    KalturaRequestBuilder.prototype.getFile = function() {
      return this.file;
    };

    KalturaRequestBuilder.prototype.getSettings = function() {
      return this.settings;
    };

    return KalturaRequestBuilder

  })();

  return  KalturaRequestBuilder;

});
