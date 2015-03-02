// Should be refactored to only handle config setup and mount tasks for
// consumption
var Backstop = function (config) {
    if (!(this instanceof Backstop)) return new Backstop(config);
    console.log(config);
};

Backstop.prototype.echo = require('./echo');
Backstop.prototype.genConfig = require('./genConfig');

module.exports = Backstop;
