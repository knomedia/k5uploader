define(['jquery'], function($){
  var XmlParser;

  XmlParser = (function(){
    XmlParser.name = 'XmlParser';

    function XmlParser (){
    }

    XmlParser.prototype.parseXML = function(xml) {
      this.$xml = $(xml);
      this.determineError();
      return this.$xml;
    };

    XmlParser.prototype.determineError = function() {
      this.isError = !!(this.find('error').children().length);
    };

    XmlParser.prototype.find = function(nodeName) {
      return this.$xml.find(nodeName);
    };

    XmlParser.prototype.nodeText = function(name, node, asNumber) {
      var res = undefined;
      if (node.find(name).text() != '') {
        res = node.find(name).text();
        if (asNumber === true) {
          res = parseFloat(res);
        }
      }
      return res;
    };

    return XmlParser

  })();

  return  XmlParser;

});
