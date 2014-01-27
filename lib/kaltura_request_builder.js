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
      var queryUrl = this.createUrl();
      xhr.open("POST", queryUrl);
      xhr.responseType = 'xml'
      return xhr;
    };

    KalturaRequestBuilder.prototype.createFormData = function() {
      var formData = new FormData();
      //var kalturaSettings = this.settings.getConfig();
      //var kalsig = this.createSignature();
      //for( prop in kalturaSettings ) {
      //  formData.append(prop, kalturaSettings[prop]);
      //}
      // TODO: determine how kaltura wants this attached
      //formData.append('kalsig', kalsig);
      debugger
      formData.append('Filename', this.file.name);
      formData.append('Filedata', this.file);
      formData.append('Upload', 'Submit Query');
      //formData.append('filename', this.createFileId());
      return formData;
    };

    KalturaRequestBuilder.prototype.createFileId = function() {
      return Date.now().toString();
      //return 13908439649731;
    };

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
      // grab all param names into array + 'service' and 'action'
      var params = this.settings.getConfig();
      var names = [];
      for (prop in params) {
        names.push(prop);
      }
      //names.push('action');
      //names.push('service');

      // sort names array
      names = names.sort();
      var s = '';
      // seems like file uploads don't have an action or service
      // push name and value to string (including 'service' and 'action')
      names.forEach(function(element, index, array){
        s += element;
        s += params[element];
      });
      var test = MD5.encrypt(s);
      console.log(MD5);
      return test;
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
