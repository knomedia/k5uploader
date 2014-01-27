define(['signature_builder', 'url_params'], function(signatureBuilder, urlParams){
  var EntryService;

  EntryService = (function(){
    EntryService.name = 'EntryService';

    function EntryService (entryUrl){
      this.entryUrl = entryUrl
    }

    EntryService.prototype.addEntry = function(uploadResult, sessionSettings) {
      this.uploadResult = uploadResult;
      this.sessionSettings = sessionSettings;
      this.createTokenRequest();
    };

    EntryService.prototype.createTokenRequest = function() {
      var data = this.formData();
      data.kalsig = signatureBuilder(data);

      var xhr = new XMLHttpRequest();
      xhr.open('GET', this.entryUrl + urlParams(data));
      xhr.requestType = 'xml';
      var self = this;
      xhr.onload = function(e) {
        //TODO: do something with these results
        debugger
      }
      xhr.send(data);
    };

    EntryService.prototype.formData = function() {
      var obj = this.uploadResult.asEntryParams();
      var session = this.sessionSettings.getConfig();
      for (prop in session) {
        obj[prop] = session[prop];
      }
      return obj;
    };

    return EntryService

  })();

  return  EntryService;

});
