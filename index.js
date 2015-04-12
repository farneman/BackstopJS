var fs = require('fs');
    paths = require('./lib/util/paths');

var Backstop = function (cwd, config) {
    if (!(this instanceof Backstop)) return new Backstop(config, cwd);

    this.paths = paths(cwd);
    this.config = config || false;
};

Backstop.prototype.bless = require('./lib/bless');
Backstop.prototype.clean = require('./lib/clean');
Backstop.prototype.echo = require('./lib/echo');
Backstop.prototype.genConfig = require('./lib/genConfig');
Backstop.prototype.openReport = require('./lib/openReport');
Backstop.prototype.reference = require('./lib/reference');
Backstop.prototype.report = require('./lib/report');
Backstop.prototype.test = require('./lib/test');

module.exports = Backstop;
