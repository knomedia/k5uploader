define(['message_bus'], function(messageBus){
  var SessionManager;

  SessionManager = (function(){
    SessionManager.name = 'SessionManager';
    SessionManager.defaultUrl = 'api/v1/services/kaltura_session';

    function SessionManager (){
      this.settings = {};
    }

    SessionManager.prototype.loadSession = function(url) {
      if(!url) {
        url = SessionManager.defaultUrl;
      }
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = 'json';
      var self = this;
      xhr.onload = function(e) {
        self.settings = xhr.response;
        messageBus.dispatchEvent('SessionManager.complete', xhr.response, self);
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
