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


});

