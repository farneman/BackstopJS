var clean = require('./clean'),
    bless  = require('./bless'),
    test  = require('./test');

// FIRST CLEAN REFERENCE DIR. THEN TEST
var reference = function () {
    clean(bless);
    test();

    console.log('reference has run.');
};

module.exports = reference;
