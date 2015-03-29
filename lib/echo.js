var spawn = require('child_process').spawn,
    path = require('path');

var echo = function () {
  var genReferenceMode = false;
  var testsPath = path.join(this.paths.backstop_module, 'capture/echoFiles.js');
  var tests = [testsPath];
  var args = ['--ssl-protocol=any'];
  var casperArgs = tests.concat(args);

  // var args = ['test'].concat(tests); //this is required if using casperjs test option

  var casperProcess = (process.platform === "win32" ? "casperjs.cmd" : "casperjs");
  //use args here to add test option to casperjs execute stmt
  var casperChild = spawn(casperProcess, casperArgs, {cwd: this.paths.backstop_module});

  casperChild.stdout.on('data', function (data) {
    console.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
  });

  casperChild.on('close', function (code) {
    var success = code === 0; // Will be 1 in the event of failure
    var result = (success) ? 'Echo files completed.' : 'Echo files failed with code: ' + code;

    console.log('\n' + result);

    //exit if there was some kind of failure in the casperChild process
    if (code !== 0) return false;

  });
};

module.exports = echo;
