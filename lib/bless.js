var fs = require('fs-extra');

// BLESS THE CURRENT CAPTURE CONFIG
var bless = function () {
    var done = function (err) {
        if (err) return console.error(err);
        console.log('Current capture config has been  blessed.');
    };

    fs.copy(this.paths.activeCaptureConfigPath, this.paths.captureConfigFileNameCache, done);
};

module.exports = bless;
