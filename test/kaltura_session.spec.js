require(['kaltura_session'], function(KalturaSession) {

  module('KalturaSession', {
    setup: function() {
      k = new KalturaSession();
      conf = {
        ks: 'ks',
        subp_id: 'sp',
        partner_id: 'part',
        uid: 'uid',
        serverTime: '1234'
      }
    }
  });

  test('setSession', function() {
    k.setSession(conf);
    equal(JSON.stringify(k.getSession()), JSON.stringify(conf), 'holds & returns all values');
  });

  test('setSession only overwrites passed values', function(){
    expect(2);
    k.setSession(conf);
    k.setSession({ks: 'alt'});
    ok(k.getSession().ks === 'alt', 'overwrites settings values');
    ok(k.getSession().uid === conf.uid, 'keeps old values were none passed in');
  });
});
