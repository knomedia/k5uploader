define([], function(){
  return function(objs) {
    if (!objs) {
      return objs
    }
    var combined = {};
    objs.forEach(function(obj){
      for(prop in obj) {
        combined[prop] = obj[prop]
      }
    });
    return combined;
  }
});