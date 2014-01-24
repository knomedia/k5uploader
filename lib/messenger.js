define([], function(){
  var Messenger;

  Messenger = (function(){
    Messenger.name = 'Messenger';

    function Messenger (){
      this.events = {};
    }


    Messenger.prototype.dispatchEvent = function(eventName, data, context) {
      if(this.events[eventName]) {
        this.events[eventName].forEach(function(eventHandler){
          eventHandler.call(context, data);
        });
      }
    };

    Messenger.prototype.addListener = function(eventName, method) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(method);
    };

    Messenger.prototype.removeListener = function(eventName, targetMethod) {
      if(this.events[eventName]) {
        var eventHandlers = this.events[eventName];
        var removalQueue = []
        this.events[eventName].forEach(function(eventHandler, index){
          if(eventHandler === targetMethod) {
            removalQueue.push(index);
          }
        });
        if(removalQueue.length > 0) {
          removalQueue.forEach(function(element) {
            eventHandlers.splice(element, 1);
          });
        }
      }
    };


    return Messenger

  })();

  return  Messenger;

});
