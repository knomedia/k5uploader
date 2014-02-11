require(['./xml_parser'], function(XmlParser) {
  module('XmlParser', {
    setup: function() {
      xmlParser = new XmlParser();
    }
  });

  test('findRecursive', function() {
    expect(2);
    var xml = '<root><up><sibling></sibling><loader>test value</loader></up></root>'
    xmlParser.parseXML(xml);
    var result = xmlParser.findRecursive('up:loader');
    equal(result.text(), 'test value', 'finds nested element');
    result = xmlParser.findRecursive('up:down');
    equal(result, undefined, 'undefined when nested element doesnt exist');
  });

});
