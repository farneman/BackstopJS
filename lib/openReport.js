var open = require('open'),
    isWin  = require('./util/isWin');

// Open Report in browser
var openReport = function () {
    var paths = this.paths;
        options = {
            url: paths.compareReportURL,
            app: isWin ? "chrome" : "Google Chrome"
        };

    console.log('\nOpening report -> ', paths.compareReport);
    open(options.url, options.app);
};

module.exports = openReport;
