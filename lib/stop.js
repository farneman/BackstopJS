var fs = require('fs');
    exec = require('child_process').exec;
    paths = require('./util/paths');

// THIS WILL STOP THE LOCAL WEBSERVER
var stop = function () {
    fs.readFile(paths.serverPidFile, function (err, pid) {
        if (pid) {
            exec('kill ' + pid, function(error, stdout, stderr) {
                console.log('Stopped PID:'+pid);
                fs.unlinkSync(paths.serverPidFile);
            });
        }
    });
};

module.exports = stop;
