require(['ui_config'], function(UiConfig) {
  module('UiConfig', {
    setup: function() {
      uiConf = new UiConfig({
        maxUploads: 1,
        maxFileSize: 2,
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

});
