var del = require('del'),
    paths  = require('./util/paths'),
    genDefaultCompareConfig = require('./util/genDefaultCompareConfig');

// CLEAN THE bitmaps_reference DIRECTORY
var clean = function (cb) {
  del([
    paths.bitmaps_reference + '/**'
  ], cb);
  genDefaultCompareConfig();
  console.log('bitmaps_reference was cleaned.');
};

module.exports = clean;
