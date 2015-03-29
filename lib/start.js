var fs = require('fs'),
    exec  = require('child_process').exec,
    spawn = require('child_process').spawn,
    path = require('path');

// THIS WILL START THE LOCAL WEBSERVER
// IF ALREADY STARTED IT WILL NOT TRY TO START AGAIN
var start = function () {
    var paths = this.paths;
    var startServer = function () {
        var serverFile = path.join(paths.backstop_module, 'server.js');
        var serverHook = spawn('node', [serverFile], {
            detached: true,
            stdio:'ignore'
        });

        serverHook.unref();
        fs.writeFileSync(paths.serverPidFile, serverHook.pid);
        console.log('\nServer launched in background with PID: ' + serverHook.pid);
        console.log('NOTE: Sever will auto-shutdown (default time 15 mins). See documentation for more info.\n');
    };

    fs.readFile(paths.serverPidFile, function (err, data) {
        if (data) {
            exec('kill -0 ' + data, function (error, stdout, stderr) {
                if (/no such process/i.test(stderr)) {
                    startServer();
                }
            });
        } else {
            startServer();
        }
    });
};

module.exports = start;
