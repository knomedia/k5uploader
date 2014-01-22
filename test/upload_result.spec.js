require(['upload_result'], function(UploadResult) {
  module('UploadResults', {
    setup: function() {
      this.result = new UploadResult()
    }
  });

  test('parsesXML', function() {
    var xml = '<?xml version="1.0" encoding="ISO-8859-1"?><xml>\
  <result>\
    <result_ok>\
      <token>1011389726328.4103</token>\
      <filename>13897264059231</filename>\
      <origFilename>iShowU HD.mov</origFilename>\
      <thumb_url></thumb_url>\
      <thumb_created></thumb_created>\
    </result_ok>\
    <serverTime>1389726406</serverTime>\
  </result>\
  <error></error>\
  <debug>\
    <sigtype>1</sigtype>\
    <validateSignature></validateSignature>\
    <signature>8b98fa8d24e22d6fe515b03ded7a7ee6</signature>\
    <execute_impl_time>0.41368103027344</execute_impl_time>\
    <execute_time>0.45064902305603</execute_time>\
    <total_time>0.45182085037231</total_time>\
  </debug>\
</xml>';

    this.result.parseXML(xml);
    equal(this.result.isError, false, 'correctly sets isError');
  });

  test('reports token correctly', function(){
    var xml = '<?xml version="1.0" encoding="ISO-8859-1"?><xml>\
  <result>\
    <result_ok>\
      <token>1011389726328.4103</token>\
      <filename>13897264059231</filename>\
      <origFilename>iShowU HD.mov</origFilename>\
      <thumb_url></thumb_url>\
      <thumb_created></thumb_created>\
    </result_ok>\
    <serverTime>1389726406</serverTime>\
  </result>\
  <error></error>\
  <debug>\
    <sigtype>1</sigtype>\
    <validateSignature></validateSignature>\
    <signature>8b98fa8d24e22d6fe515b03ded7a7ee6</signature>\
    <execute_impl_time>0.41368103027344</execute_impl_time>\
    <execute_time>0.45064902305603</execute_time>\
    <total_time>0.45182085037231</total_time>\
  </debug>\
</xml>';

    this.result.parseXML(xml);
    equal(this.result.token, 1011389726328.4103, 'pulls token correctly');

  });

  test('handles no token', function() {
    var xml = '<xml><result><result_ok></result_ok></result></xml>'
    this.result.parseXML(xml);
    debugger
    equal(this.result.token, undefined, 'returns undefined when no token');
  });
});
