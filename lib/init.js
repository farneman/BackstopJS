var fs = require('fs'),
    spawn = require('child_process').spawn;

// TODO might want to call this compare/bower and rename genConfig to init
// TODO bower as a dependency instead of external command?
// See https://www.npmjs.com/package/gulp-bower

// MANAGE DEPENDENCIES
var init = function (cb) {
    var bowerProcess,
        paths = this.paths;

    // load missing bower components
    if (!fs.existsSync(paths.comparePath + '/bower_components')) {
        bowerProcess = (process.platform === "win32" ? "bower.cmd" : "bower");

        console.log('\nBackstopJS needs to update bower_components, please hang on...\n');
        spawn(bowerProcess, ['install'], {cwd: paths.comparePath})
            .on('error', function () {
                console.error('\nBower process fail. :(  Please report this bug on github.\n');
            });
    }

    if (typeof cb !== 'undefined') {
        cb();
    }
};

module.exports = init;
