define(['md5'], function(MD5){
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
      return Date.now().toString();
    };

    // flash uploader seems to send these as GET query params
    // and file data as POST
    KalturaRequestBuilder.prototype.createUrl = function() {
      var qUrl = this.url + "?";
      var config = this.settings.getConfig();
      var params = ['partner_id', 'subp_id', 'uid', 'ks'];
      params.forEach(function(el, index, array){
        qUrl += el + '=' + encodeURIComponent(config[el]) + '&';
      });
      qUrl += 'filename=' + this.createFileId() + '&';
      qUrl += 'kalsig=' + this.createSignature();
      return qUrl

    };

    KalturaRequestBuilder.prototype.createSignature = function() {
      var params = this.settings.getConfig();
      var names = [];
      for (prop in params) {
        names.push(prop);
      }
      names = names.sort();
      var s = '';
      names.forEach(function(element, index, array){
        s += element;
        s += params[element];
      });
      return MD5.encrypt(s);
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
