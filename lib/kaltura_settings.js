define(['defaults'], function(defaults){
  var KalturaSettings;

  KalturaSettings = (function(){
    KalturaSettings.name = 'KalturaSettings';

    function KalturaSettings (){
      this.ks = '';
      this.subp_id = '';
      this.partner_id = '';
      this.uid = '';
      this.serverTime = 0;
    }

    KalturaSettings.prototype.setConfig = function(obj) {
      if (obj) {
        defaults('ks', this, obj);
        defaults('subp_id', this, obj);
        defaults('partner_id', this, obj);
        defaults('uid', this, obj);
        defaults('serverTime', this, obj);
        defaults('ui_conf_id', this, obj);
      }
    };

    KalturaSettings.prototype.getConfig = function() {
      return {
        ks: this.ks,
        subp_id: this.subp_id,
        partner_id: this.partner_id,
        uid: this.uid,
        serverTime: this.serverTime,
        ui_conf_id: this.ui_conf_id
      }
    };

    return KalturaSettings

  })();

  return  KalturaSettings;

});
