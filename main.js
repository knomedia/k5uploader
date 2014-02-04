require.config({
  baseUrl: './lib/',
  include: ['k5uploader'],
  paths: {
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
      sessionUrl: 'http://localhost:3001/proxy/kaltura_session',
      uploadUrl: 'http://localhost:3001/index.php/partnerservices2/upload',
      entryUrl: 'http://localhost:3001/index.php/partnerservices2/addEntry',
      uiconfUrl: 'http://localhost:3001/index.php/partnerservices2/getuiconf',
      entryDefaults: {
        partnerData: "{'context_code': 'course_1', 'root_account_id':1}",
      }
    }

    function onProg(e) {
      var prog = document.getElementById('prog');
      var lbl = document.getElementById('prog-label');
      console.log('setting width');
      var prc = Math.round((e.loaded / e.total) * 100);
      prog.style.width = prc + '%';
      lbl.innerHTML = prc + '%';
    }

    var file = this.files[0]

    var k5 = new K5(opts);
    k5.addEventListener('K5.progress', onProg);
    k5.addEventListener('K5.error', function(e){
      alert('there was an error uploading the file');
    });
    k5.addEventListener('K5.complete', function(e){
      console.log('upload process complete');
      console.log(e);
    });
    k5.addEventListener('K5.ready', function(){
      this.uploadFile(file);
    });
  }

});

