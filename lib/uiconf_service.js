define([
  'url_params',
  'signature_builder',
  'xml_parser',
  'ui_config',
  'ui_config_from_node',
  'message_bus',
  'k5_options'
], function(urlParams,
            signatureBuilder,
            XmlParser,
            UiConfig,
            uiConfigFromNode,
            mBus,
            k5Options){
  var UiconfService;

  UiconfService = (function(){
    UiconfService.name = 'UiconfService';

    function UiconfService (){
      this.xmlParser = new XmlParser();
    }

    UiconfService.prototype.load = function(sessionSettings) {
      var data = sessionSettings.getSessionParams();
      data.kalsig = signatureBuilder(data);
      this.xhr = new XMLHttpRequest();
      this.xhr.open('GET', k5Options.uiconfUrl + urlParams(data));
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

    UiconfService.prototype.asEntryParams = function(file) {
      var fileFilter = this.config.filterFor(file);
      return fileFilter.toParams();
    };

    return UiconfService

  })();

  return  UiconfService;

});
