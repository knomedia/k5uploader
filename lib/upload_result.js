define(['jquery'], function($){
  var UploadResult;

  UploadResult = (function(){
    UploadResult.name = 'UploadResult';



    function UploadResult (){
      this.xml = undefined;
      this.isError = true;
      this.token = undefined;
      this.filename = '';
      this.fileId = -1;
    }

    UploadResult.prototype.parseXML = function(xml) {
      this.xml = xml;
      var $xml = $(xml);
      this.determineError($xml);
      if(!this.isError) {
        this.pullData($xml);
      }
    };

    UploadResult.prototype.determineError = function($xml) {
      this.isError = !!($xml.find('error').children().length);
    };

    UploadResult.prototype.pullData = function($xml) {
      var $resultOk = $xml.find('result_ok');
      this.token = this.nodeText('token', $resultOk, true);
      this.fileId = this.nodeText('filename', $resultOk, true);
      this.filename = this.nodeText('origFilename', $resultOk);
    };

    UploadResult.prototype.nodeText = function(name, resultOk, asNumber) {
      var res = undefined;
      if (resultOk.find(name).text() != '') {
        res = resultOk.find(name).text();
        if (asNumber === true) {
          res = parseFloat(res);
        }
      }
      return res;
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
