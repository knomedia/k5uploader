require(['./ui_config', './file_filter'], function(UiConfig, FileFilter) {
  module('UiConfig', {
    setup: function() {
      uiConf = new UiConfig({
        maxUploads: 1,
        maxFileSize: 1,
        maxTotalSize: 3
      });
    }
  });

  function stubFilter(withExtension) {
    return {
      includesExtension: function(ext) {
        return withExtension;
      }
    }
  }

  function createFileFilter(type, extensions) {
    return new FileFilter({
      extensions: extensions,
      id: type
    });
  }

  function stubFile(name, size) {
    return {
      name: name,
      size: size
    }
  }

  test('addFileFilter', function() {
    var first = {testing: true};
    var second = {other: true};
    uiConf.addFileFilter(first);
    uiConf.addFileFilter(second);
    equal(uiConf.fileFilters.length, 2, 'adds file filters');

  });

  test('filterFor', function() {
    expect(2);
    var first = stubFilter(false);
    var second = stubFilter(false);
    var good = stubFilter(true);

    uiConf.addFileFilter(first);
    uiConf.addFileFilter(second);

    var result = uiConf.filterFor('doesnt matter method is stubbed');
    equal(result, undefined, 'returns undefined when no filter found');

    uiConf.addFileFilter(good);
    result = uiConf.filterFor('doesnt matter method is stubbed');
    equal(result, good, 'returns filter that has extension');
  });


  test('acceptableFile - type', function() {
    expect(3);
    var acceptedTypes = ['video', 'audio'];
    var res;

    uiConf.addFileFilter(createFileFilter('video', '*.mov;*.ogg' ));
    uiConf.addFileFilter(createFileFilter('audio', '*.mp3;*.aif' ));

    var file = stubFile('testing.mov', 1234);
    res = uiConf.acceptableFile(file, acceptedTypes);
    equal(res, true, 'verifies correct file types');

    file.name = 'testing.mp3';
    res = uiConf.acceptableFile(file, acceptedTypes);
    equal(res, true, 'verifies correct file types');

    file.name = 'testing.doc';
    res = uiConf.acceptableFile(file, acceptedTypes);
    equal(res, false, 'rejects incorrect file types');
  });

  test('acceptableFile - size', function() {
    var file = stubFile('testfile.mp3', ((1024*1025) + 1)); // 1 byte about 1MB
    uiConf.addFileFilter(createFileFilter('audio', '*.mp3;*.aif' ));
    var res = uiConf.acceptableFile(file, ['audio']); // 1 byte above 1MB
    equal(res, false, 'correctly looks at limits');
  });

});
