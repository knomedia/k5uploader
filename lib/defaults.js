define([], function(){

  return function(name, options, passed){
    options[name] = passed[name] || options[name];
   }

});
