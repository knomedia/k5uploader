define(['jquery'], function($){
  var UploadResult;

  UploadResult = (function(){
    UploadResult.name = 'UploadResult';

    function UploadResult (){
      this.xml = undefined;
      this.isError = true;
      this.token = undefined;
    }

    UploadResult.prototype.parseXML = function(xml) {
      this.xml = xml;
      var $xml = $(xml);
      this.determineError($xml);
      if(!this.isError) {
        this.pullToken($xml);
      }
    };

    UploadResult.prototype.determineError = function($xml) {
      this.isError = !!($xml.find('error').children().length);
    };

    UploadResult.prototype.pullToken = function($xml) {
      var $resultOk = $xml.find('result_ok');
      if ($resultOk.find('token').text() != '') {
        this.token = parseFloat($resultOk.find('token').text());
      } else {
        this.token = undefined;
      }
    };

    return UploadResult

  })();

  return  UploadResult;

});
