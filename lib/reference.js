// var clean = require('./clean'),
//     bless  = require('./bless'),
//     test  = require('./test');

// FIRST CLEAN REFERENCE DIR. THEN TEST
var reference = function () {
    var backstop = this;

    backstop.clean(backstop.bless(backstop.test(true)));

    console.log('reference has run.');
};

module.exports = reference;
