require(['file_filter'], function(FileFilter) {

  module('FileFilter', {
    setup: function() {
      extensions = '*.jpg;*.jpeg;*.bmp;*.png;*.gif;*.tif;*.tiff';
      ff = new FileFilter({extensions: extensions});
    }
  });

  test('parseExtensions', function() {
    equal(ff.extensions.length, 7, 'parses to correct number of extensions');
    equal(ff.extensions[1], 'jpeg', 'disregards wildcard notation');
  });

  test('includesExtension', function() {
    expect(2);
    equal(ff.includesExtension('gif'), true, 'finds included extensions');
    equal(ff.includesExtension('blrg'), false, 'doesnt find non extensions');
  });

});
