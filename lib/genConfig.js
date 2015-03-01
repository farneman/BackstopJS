var fs = require('fs-extra'),
    paths  = require('./util/paths');

//GENERATE CAPTURE CONFIG
var genConfig = function (cb) {
    var done = function (err) {
        if (err) return console.error(err);
        cb();
    };

    fs.copy(paths.captureConfigFileNameDefault, paths.backstopConfigFileName, {replace: false}, done);
};

module.exports = genConfig;
