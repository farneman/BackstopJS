var path = require('path');
var fs = require('fs');

var paths = {};

// BACKSTOP MODULE PATH
paths.backstop                      = __dirname + '/../..';

// SERVER PID PATH
paths.serverPidFile                 = paths.backstop + '/server.pid';

// BITMAPS PATHS
paths.bitmaps_reference             = paths.backstop + '/bitmaps_reference';
paths.bitmaps_test                  = paths.backstop + '/bitmaps_test';

// BACKSTOP CONFIG PATH
paths.backstopConfigFileName        = path.join(paths.backstop, '../..', 'backstop.json');

// COMPARE PATHS
paths.comparePath                   = paths.backstop + '/compare';
paths.compareConfigFileName         = paths.comparePath+'/config.json';
paths.compareReportURL              = 'http://localhost:3001/compare/';

// CAPTURE CONFIG PATHS
paths.captureConfigFileName         = paths.backstop + '/capture/config.json';
paths.captureConfigFileNameCache    = paths.backstop + '/capture/.config.json.cache';
paths.captureConfigFileNameDefault  = paths.backstop + '/capture/config.default.json';

// ACTIVE CAPTURE CONFIG PATH
paths.activeCaptureConfigPath = paths.backstopConfigFileName;

module.exports = paths;
