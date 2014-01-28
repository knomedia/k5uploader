define([
  'signature_builder',
  'url_params',
  'message_bus',
  'xml_parser'
], function(signatureBuilder,
            urlParams,
            mBus,
            XmlParser){
  var EntryService;

  EntryService = (function(){
    EntryService.name = 'EntryService';

    function EntryService (entryUrl){
      this.entryUrl = entryUrl
      this.xmlParser = new XmlParser();
    }

    EntryService.prototype.addEntry = function(uploadResult, sessionSettings) {
      this.uploadResult = uploadResult;
      this.sessionSettings = sessionSettings;
      this.createEntryRequest();
    };

    EntryService.prototype.createEntryRequest = function() {
      var data = this.formData();
      data.kalsig = signatureBuilder(data);

      var xhr = new XMLHttpRequest();
      xhr.open('GET', this.entryUrl + urlParams(data));
      xhr.requestType = 'xml';
      var self = this;
      xhr.onload = function(e) {
        self.xmlParser.parseXML(xhr.response);
        var ent = self.xmlParser.findRecursive('result:entries:entry1_');
        if (ent) {
          //TODO: convert type int to string value
          //TODO: convert partnerData to grab context_code
          var ent = {
            id: ent.find('id').text(),
            type: ent.find('type').text(),
            title: ent.find('name').text(),
            context_code: ent.find('partnerData').text()
          };
          mBus.dispatchEvent('Entry.success', ent, self);
        } else {
          mBus.dispatchEvent('Entry.fail', xhr.response, self);
        }
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
