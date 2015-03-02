var fs = require('fs'),
    spawn = require('child_process').spawn,
    paths  = require('./util/paths');

// TODO might want to call this compare/bower and rename genConfig to init
// TODO bower as a dependency instead of external command?
// See https://www.npmjs.com/package/gulp-bower

// MANAGE DEPENDENCIES
var init = function (cb) {
    var bowerProcess;

    // load missing bower components
    if (!fs.existsSync(paths.comparePath+'/bower_components')) {
        bowerProcess = (process.platform === "win32" ? "bower.cmd" : "bower");

        console.log('\nBackstopJS needs to update bower_components, please hang on...\n');
        spawn(bowerProcess, ['install'], {cwd: paths.comparePath})
            .on('error', function () {
                console.log('\nBower process fail. :(  Please report this bug on github.\n');
            });
    }

    cb();
};

module.exports = init;
