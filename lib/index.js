var fs = require('fs');
    fse = require('fs-extra');
    paths = require('./util/paths');
    genDefaultCompareConfig = require('./util/genDefaultCompareConfig');

// TODO Cleanup and configure paths and config for use

var Backstop = function (config) {
    if (!(this instanceof Backstop)) return new Backstop(config);
    console.log(config);

    // FROM _INIT_
    // TODO Is any of this still needed?
    //   Or is it just cruft that was hiding in a large file?

    //this is for compare/genBitmaps.js until we can pass the active location via env
    fse.copySync(paths.activeCaptureConfigPath,paths.captureConfigFileName);

    if (!fs.existsSync(paths.compareConfigFileName)) {
        console.log('No compare/config.json file exists. Creating default file.');
        genDefaultCompareConfig();
    }
};

Backstop.prototype.bless = require('./bless');
Backstop.prototype.clean = require('./clean');
Backstop.prototype.echo = require('./echo');
Backstop.prototype.genConfig = require('./genConfig');
Backstop.prototype.init = require('./init');
Backstop.prototype.openReport = require('./openReport');
Backstop.prototype.reference = require('./reference');
Backstop.prototype.report = require('./report');
Backstop.prototype.start = require('./start');
Backstop.prototype.stop = require('./stop');
Backstop.prototype.test = require('./test');

module.exports = Backstop;
