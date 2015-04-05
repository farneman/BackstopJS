// var start = require('./start'),
//     openReport = require('./openReport');

// START SERVER AND RUN REPORT
var report = function () {
    var backstop = this;

    backstop.start();
    setTimeout(function () {
        backstop.openReport();
    }, 300);
};

module.exports = report;
