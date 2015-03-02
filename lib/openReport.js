var open = require('open'),
    isWin  = require('./util/isWin'),
    paths  = require('./util/paths');

// Open Report in browser
var openReport = function () {
    var options = {
        url: paths.compareReportURL,
        app: isWin ? "chrome" : "Google Chrome"
    };

    console.log('\nOpening report -> ', paths.compareReportURL);

    open(options.url, options.app);
};

module.exports = openReport;
