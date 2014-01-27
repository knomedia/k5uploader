define([], function(){

  return function (params) {
    queryUrl = '?';
    for(prop in params){
      queryUrl += prop + '=' + encodeURIComponent(params[prop]) + '&';
    }
    return queryUrl;
  }

});
