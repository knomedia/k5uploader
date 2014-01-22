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
      this.ks = '';
      this.subp_id = '';
      this.partner_id = '';
      this.uid = '';
      this.serverTime = 0;
    }

    KalturaSettings.prototype.setConfig = function(obj) {
      if (obj) {
        this.ks = obj.ks || this.ks;
        this.subp_id = obj.subp_id || this.subp_id;
        this.partner_id = obj.partner_id || this.partner_id;
        this.uid = obj.uid || this.uid;
        this.serverTime = obj.serverTime || this.serverTime;
      }
    };

    KalturaSettings.prototype.getConfig = function() {
      return {
        ks: this.ks,
        subp_id: this.subp_id,
        partner_id: this.partner_id,
        uid: this.uid,
        serverTime: this.serverTime
      }
    };

    return KalturaSettings

  })();

  return  KalturaSettings;

});
