require.config({
  baseUrl: './lib/',
  include: ['k5uploader'],
  shim: {
    underscore: {
      exports: '_'
    }
  },
  paths: {
    "underscore": "../bower_components/underscore/underscore-min",
    "jquery": "../bower_components/jquery/jquery"
  }
});

require([
  'k5uploader',
  'uploader',
  'kaltura_settings',
  'message_bus',
  'session_manager'
], function(K5, Uploader, KSettings, mBus, SessionManager){

  var input = document.getElementById('upload_file');
  input.addEventListener('change', doUpload);
  function doUpload(e) {
    var opts = {
      sessionUrl: 'http://localhost:3000/proxy/kaltura_session',
      uploadUrl: 'http://localhost:3000/index.php/partnerservices2/upload',
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
  }

});

