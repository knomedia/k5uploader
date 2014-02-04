define(['message_bus', 'k5_options'], function(messageBus, k5Options){
  var SessionManager;

  SessionManager = (function(){
    SessionManager.name = 'SessionManager';

    function SessionManager (){
      this.settings = {};
    }

    SessionManager.prototype.loadSession = function() {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", k5Options.sessionUrl, true);
      xhr.responseType = 'json';
      var self = this;
      xhr.onload = function(e) {
        if (xhr.status == 200) {
          self.settings = xhr.response;
          messageBus.dispatchEvent('SessionManager.complete', xhr.response, self);
        } else {
          messageBus.dispatchEvent('SessionManager.error');
          messageBus.dispatchEvent('SessionManager.complete', xhr.response, self);
        }
      }
      xhr.send();
    };

    SessionManager.prototype.getSettings = function() {
      return this.settings;
    };

    return SessionManager

  })();

  return  SessionManager;

});
