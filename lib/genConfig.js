var fs = require('fs-extra');

// GENERATE CAPTURE CONFIG
var genConfig = function () {
    var paths = this.paths,
        done = function (err) {
            if (err) return console.error(err);
            console.log('backstop.json created.');
        };

    if (this.config !== false) {
        console.error('Config already loaded.');
        return;
    }

    fs.copy(paths.captureConfigFileNameDefault, paths.backstopConfigFileName, {replace: false}, done);
};

module.exports = genConfig;
