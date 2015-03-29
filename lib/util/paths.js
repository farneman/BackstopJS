var path = require('path');
var fs = require('fs');

var pathConfig = function (cwd) {
    var paths = {};

    // BACKSTOP CONFIG FILE DIR
    paths.backstop                      = cwd;
    // BACKSTOP CONFIG FILE PATH
    paths.backstopConfigFileName        = path.join(paths.backstop, 'backstop.json');

    // BACKSTOP MODULE PATH
    paths.backstop_module = path.dirname(require.main.filename) + '/..';
    console.log(paths.backstop_module);
    console.log(paths.backstop);

    // SERVER PID PATH
    paths.serverPidFile                 = paths.backstop_module + '/server.pid';

    // BITMAPS PATHS
    paths.bitmaps_reference             = paths.backstop + '/bitmaps_reference';
    paths.bitmaps_test                  = paths.backstop + '/bitmaps_test';

    // COMPARE PATHS
    paths.comparePath                   = paths.backstop_module + '/compare';
    paths.compareConfigFileName         = paths.comparePath+'/config.json';
    paths.compareReportURL              = 'http://localhost:3001/compare/';

    // CAPTURE CONFIG PATHS
    // Template for generating backstop.json
    paths.captureConfigFileNameCache    = paths.backstop_module + '/capture/.config.json.cache';
    paths.captureConfigFileNameDefault  = paths.backstop_module + '/capture/config.default.json';

    // ACTIVE CAPTURE CONFIG PATH
    // Set path to json config being used
    paths.activeCaptureConfigPath = paths.backstopConfigFileName;

    return paths;
};

module.exports = pathConfig;
