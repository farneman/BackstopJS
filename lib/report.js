// var start = require('./start'),
//     openReport = require('./openReport');

// START SERVER AND RUN REPORT
var report = function () {
    this.start();
    setTimeout(function () {
        this.openReport();
    }, 100);
};

module.exports = report;
