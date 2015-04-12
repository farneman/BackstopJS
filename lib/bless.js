var fs = require('fs-extra');

// BLESS THE CURRENT CAPTURE CONFIG
var bless = function (cb) {
    var done = function (err) {
        if (err) return console.error(err);
        console.log('Current capture config has been blessed.');
        if (typeof cb !== 'undefined') cb();
    };

    fs.copy(this.paths.activeCaptureConfigPath, this.paths.captureConfigFileNameCache, done);
};

module.exports = bless;
