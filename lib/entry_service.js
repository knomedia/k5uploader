define([
  'signature_builder',
  'url_params',
  'message_bus',
  'xml_parser',
  'object_merge',
  'k5_options'
], function(signatureBuilder,
            urlParams,
            mBus,
            XmlParser,
            objectMerge,
            k5Options){
  var EntryService;

  EntryService = (function(){
    EntryService.name = 'EntryService';

    function EntryService (){
      this.xmlParser = new XmlParser();
    }

    EntryService.prototype.addEntry = function(allParams) {
      this.formData = objectMerge(allParams);
      this.createEntryRequest();
    };

    EntryService.prototype.createEntryRequest = function() {
      var data = this.formData;
      data.kalsig = signatureBuilder(data);

      this.xhr = new XMLHttpRequest();
      this.xhr.open('GET', k5Options.entryUrl + urlParams(data));
      this.xhr.requestType = 'xml';
      this.xhr.onload = this.onEntryRequestLoaded.bind(this);
      this.xhr.send(data);
    };

    EntryService.prototype.onEntryRequestLoaded = function(e) {
      this.xmlParser.parseXML(this.xhr.response);
      var ent = this.xmlParser.findRecursive('result:entries:entry1_');
      if (ent) {
        //TODO: convert type int to string value
        //TODO: convert partnerData to grab context_code
        var ent = {
          id: ent.find('id').text(),
          type: ent.find('type').text(),
          title: ent.find('name').text(),
          context_code: ent.find('partnerData').text()
        };
        mBus.dispatchEvent('Entry.success', ent, this);
      } else {
        mBus.dispatchEvent('Entry.fail', this.xhr.response, this);
      }
    };

    return EntryService

  })();

  return  EntryService;

});