var path = require('path');
var fs = require('fs');

var pathConfig = function (cwd) {
    var paths = {};

    // BACKSTOP CONFIG FILE DIR
    paths.backstop                      = cwd;
    paths.backstopFiles = path.join(paths.backstop, 'backstop_files');
    // BACKSTOP CONFIG FILE PATH
    paths.backstopConfigFileName        = path.join(paths.backstop, 'backstop.json');

    // BACKSTOP MODULE PATH
    paths.backstop_module = path.dirname(require.main.filename) + '/..';

    // SERVER PID PATH
    paths.serverPidFile                 = paths.backstop_module + '/server.pid';

    // BITMAPS PATHS
    paths.bitmaps_reference             = paths.backstopFiles + '/bitmaps_reference';
    paths.bitmaps_test                  = paths.backstopFiles + '/bitmaps_test';

    // COMPARE PATHS
    paths.compareDefaultPath                   = paths.backstop_module + '/compare';
    paths.compareConfigFileName         = paths.backstopFiles + '/config.json';
    paths.compareReport              = paths.backstopFiles + '/report.html';

    // CAPTURE CONFIG PATHS
    // Template for generating backstop.json
    paths.captureConfigFileNameCache    = paths.backstopFiles + '/lib/capture/.config.json.cache';
    paths.captureConfigFileNameDefault  = paths.backstop_module + '/lib/capture/config.default.json';

    // ACTIVE CAPTURE CONFIG PATH
    // Set path to json config being used
    paths.activeCaptureConfigPath = paths.backstopConfigFileName;

    return paths;
};

module.exports = pathConfig;
