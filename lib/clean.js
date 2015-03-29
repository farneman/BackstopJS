var del = require('del'),
    genDefaultCompareConfig = require('./util/genDefaultCompareConfig');

// CLEAN THE bitmaps_reference DIRECTORY
var clean = function (cb) {
    var paths = this.paths;

    var finished = function () {
        genDefaultCompareConfig(paths);
        console.log('bitmaps_reference was cleaned.');
        if (typeof cb !== 'undefined') cb();
    };

    del([
        paths.bitmaps_reference + '/**'
    ], finished);
};

module.exports = clean;
