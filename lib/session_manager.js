define([
'message_bus',
'k5_options',
'kaltura_session',
], function(
  messageBus,
  k5Options,
  KalturaSession
){
  var SessionManager;

  SessionManager = (function(){
    SessionManager.name = 'SessionManager';

    function SessionManager (){
      this.sessionData = new KalturaSession();
    }

    SessionManager.prototype.loadSession = function() {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", k5Options.sessionUrl, true);
      xhr.responseType = 'json';
      var self = this;
      xhr.onload = this.onSessionLoaded.bind(this);
      xhr.send();
    };

    SessionManager.prototype.onSessionLoaded = function(e) {
      var xhr = e.target;
      if (xhr.status == 200) {
        this.sessionData.setSession(xhr.response);
        messageBus.dispatchEvent('SessionManager.complete', this.sessionData, self);
      } else {
        messageBus.dispatchEvent('SessionManager.error');
      }
    };

    SessionManager.prototype.getSession = function() {
      return this.sessionData;
    };

    return SessionManager

  })();

  return  SessionManager;

});
