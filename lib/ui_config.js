define([], function(){
  var UiConfig;

  UiConfig = (function(){
    UiConfig.name = 'UiConfig';

    function UiConfig (params){
      this.fileFilters = [];
      this.maxUploads = params.maxUploads;
      this.maxFileSize = params.maxFileSize;
      this.maxTotalSize = params.maxTotalSize;
    }

    UiConfig.prototype.addFileFilter = function(fileFilter) {
      this.fileFilters.push(fileFilter);
    };

    UiConfig.prototype.filterFor = function(fileName) {
      var filter,
          f;
      var extension = '.mov';
      for(var i=0, len = this.fileFilters.length; i<len; i++) {
        f = this.fileFilters[i];
        if (f.includesExtension(extension)) {
          filter = f;
          break;
        }
      }
      return filter;
    };


    return UiConfig

  })();

  return  UiConfig;

});
