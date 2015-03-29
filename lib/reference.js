// var clean = require('./clean'),
//     bless  = require('./bless'),
//     test  = require('./test');

// FIRST CLEAN REFERENCE DIR. THEN TEST
var reference = function () {
    this.clean(this.bless);
    this.test();

    console.log('reference has run.');
};

module.exports = reference;
