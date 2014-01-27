define(['signature_builder', 'url_params'], function(signatureBuilder, urlParams){
  var KalturaRequestBuilder;

  KalturaRequestBuilder = (function(){
    KalturaRequestBuilder.name = 'KalturaRequestBuilder';
    KalturaRequestBuilder.id = 1;

    function KalturaRequestBuilder (){
      this.settings,
      this.url,
      this.file;
      this.xhr;
    }

    KalturaRequestBuilder.prototype.createRequest = function() {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", this.createUrl());
      xhr.responseType = 'xml'
      return xhr;
    };

    KalturaRequestBuilder.prototype.createFormData = function() {
      var formData = new FormData();
      formData.append('Filename', this.file.name);
      formData.append('Filedata', this.file);
      formData.append('Upload', 'Submit Query');
      return formData;
    };

    KalturaRequestBuilder.prototype.createFileId = function() {
      KalturaRequestBuilder.id += 1;
      return Date.now().toString() + KalturaRequestBuilder.id.toString();
    };

    // flash uploader sends these as GET query params
    // and file data as POST
    KalturaRequestBuilder.prototype.createUrl = function() {
      var config = this.settings.getConfig();
      config.filename = this.createFileId();
      config.kalsig = this.createSignature();
      return this.url + urlParams(config);
    };

    KalturaRequestBuilder.prototype.createSignature = function() {
      return signatureBuilder(this.settings.getConfig());
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
