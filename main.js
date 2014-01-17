require.config({
  baseUrl: './lib/',
  include: ['k5uploader'],
  shim: {
    underscore: {
      exports: '_'
    }
  },
  paths: {
    "underscore": "../bower_components/underscore/underscore-min"
  }
});

require([
  'k5uploader',
  'uploader',
  'kaltura_settings',
  'message_bus',
  'session_manager'
], function(K5, Uploader, KSettings, mBus, SessionManager){

  opts = {
    sessionUrl: 'http://localhost:3000/proxy/kaltura_session',
    uploadUrl: 'http://localhost:3000/proxy',
  }
  var k5 = new K5(opts);
  var file = new Blob(['hello world'], {type: 'text/plain'});

  mBus.addListener('Uploader.progress', function(event){
    console.log(event.type);
  });
  mBus.addListener('Uploader.load', function(event){
    console.log(event);
  });

  k5.onReady = function() {
    this.uploadFile(file);
  }

});

