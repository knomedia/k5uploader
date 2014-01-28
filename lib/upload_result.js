define(['xml_parser'], function(XmlParser){
  var UploadResult;

  UploadResult = (function(){
    UploadResult.name = 'UploadResult';

    function UploadResult (){
      this.xml = undefined;
      this.isError = true;
      this.token = undefined;
      this.filename = '';
      this.fileId = -1;
      this.xmlParser = new XmlParser();
    }

    UploadResult.prototype.parseXML = function(xml) {
      var $xml = this.xmlParser.parseXML(xml);
      this.isError = this.xmlParser.isError;
      if (!this.xmlParser.isError) {
        this.pullData();
      }
    };

    UploadResult.prototype.pullData = function() {
      var $resultOk = this.xmlParser.find('result_ok');
      this.token = this.xmlParser.nodeText('token', $resultOk, true);
      this.fileId = this.xmlParser.nodeText('filename', $resultOk, true);
      this.filename = this.xmlParser.nodeText('origFilename', $resultOk);
    };

    UploadResult.prototype.asEntryParams = function() {
      return {
        entry1_name: this.filename,
        entry1_filename: this.fileId,
        entry1_realFilename: this.filename,
        entry1_partnerData: {},     // add partner data
        // {"context_code":"course_1","root_account_id":1}

        entry_conversionProfile: 2, // NO IDEA
        entry1_type: 1,             // NO IDEA
        kshow_id: -1,               // NO IDEA
        entry1_source: 1,           // NO IDEA

        entry1_mediaType: 1         // FROM getuiconf
      }
    };

    return UploadResult

  })();

  return  UploadResult;

});
