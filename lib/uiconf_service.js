define([
  'url_params',
  'signature_builder',
  'xml_parser',
  'ui_config',
  'ui_config_from_node',
  'message_bus'
], function(urlParams,
            signatureBuilder,
            XmlParser,
            UiConfig,
            uiConfigFromNode,
            mBus){
  var UiconfService;

  UiconfService = (function(){
    UiconfService.name = 'UiconfService';

    function UiconfService (){
      this.xmlParser = new XmlParser();
    }

    UiconfService.prototype.load = function(url, sessionSettings) {
      var data = sessionSettings.getConfig();
      data.kalsig = signatureBuilder(data);
      this.xhr = new XMLHttpRequest();
      this.xhr.open('GET', url + urlParams(data));
      this.xhr.addEventListener('load', this.onXhrLoad.bind(this));
      this.xhr.send(data);
    };

    UiconfService.prototype.createUiConfig = function(xml) {
      this.config = uiConfigFromNode(xml);
    };

    UiconfService.prototype.onXhrLoad = function(event) {
      this.xmlParser.parseXML(this.xhr.response);
      var conf = this.xmlParser.find('result').find('ui_conf').find('confFile').first().text()
      if(!conf) {
        mBus.dispatchEvent('UiConf.error', this.xhr.response, this);
      } else {
        this.xmlParser = new XmlParser();
        this.xmlParser.parseXML(conf);
        this.config = uiConfigFromNode(this.xmlParser);
        mBus.dispatchEvent('UiConf.complete', this.config, this);
      }
    };

    return UiconfService

  })();

  return  UiconfService;

});
