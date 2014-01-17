require(['kaltura_settings'], function(KalturaSettings) {

  module('KalturaSettings', {
    setup: function() {
      k = new KalturaSettings();
      conf = {
        ks: 'ks',
        subp_id: 'sp',
        partner_id: 'part',
        uid: 'uid',
        serverTime: '1234'
      }
    }
  });

  test('setConfig', function() {
    k.setConfig(conf);
    equal(JSON.stringify(k.getConfig()), JSON.stringify(conf), 'holds & returns all values');
  });

  test('setConfig only overwrites passed values', function(){
    expect(2);
    k.setConfig(conf);
    k.setConfig({ks: 'alt'});
    ok(k.getConfig().ks === 'alt', 'overwrites settings values');
    ok(k.getConfig().uid === conf.uid, 'keeps old values were none passed in');
  });
});
