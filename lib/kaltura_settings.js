define([], function(){
  var KalturaSettings;

  KalturaSettings = (function(){
    KalturaSettings.name = 'KalturaSettings';
    var ks,
        subp_id,
        partner_id,
        uid,
        serverTime;

    function KalturaSettings (){
    }

    KalturaSettings.prototype.setConfig = function(obj) {
      ks = obj.ks || ks;
      subp_id = obj.subp_id || subp_id;
      partner_id = obj.partner_id || partner_id;
      uid = obj.uid || uid;
      serverTime = obj.serverTime || serverTime;
    };

    KalturaSettings.prototype.getConfig = function() {
      return {
        ks: ks,
        subp_id: subp_id,
        partner_id: partner_id,
        uid: uid,
        serverTime: serverTime
      }
    };

    return KalturaSettings

  })();

  return  KalturaSettings;

});
