define([], function(){
  var MessageBus;

  MessageBus = (function(){
    MessageBus.name = 'MessageBus';

    function MessageBus (){
      this.events = {};
    }

    MessageBus.prototype.dispatchEvent = function(eventName, data, context) {
      if(this.events[eventName]) {
        this.events[eventName].forEach(function(eventHandler){
          eventHandler.call(context, data);
        });
      }
    };

    MessageBus.prototype.addListener = function(eventName, method) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(method);
    };

    MessageBus.prototype.removeListener = function(eventName, targetMethod) {
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

    return MessageBus

  })();

  return  new MessageBus();

});
