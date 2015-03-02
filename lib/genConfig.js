var fs = require('fs-extra'),
    paths  = require('./util/paths');

// GENERATE CAPTURE CONFIG
var genConfig = function () {
    var done = function (err) {
        if (err) return console.error(err);
        console.log('backstop.json created.');
    };

    fs.copy(paths.captureConfigFileNameDefault, paths.backstopConfigFileName, {replace: false}, done);
};

module.exports = genConfig;
