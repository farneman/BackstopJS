var start = require('./start');
    openReport = require('./openReport');

// START SERVER AND RUN REPORT
var report = function () {
    start();
    setTimeout(function () {
        openReport();
    },100);
};

module.exports = report;
