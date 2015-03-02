#!/usr/bin/env node
var program = require('commander'),
    read = require('read-file-stdin'),
    resolve = require('path').resolve,
    Backstop = require('..');

/**
 * Usage
 */

program.version(require('../package.json').version)
    .usage('<command>')
    .option('-c, --config <path>', 'configration file location', './backstop.json');

/**
 * Help/examples
 */

program.on('--help', function () {
    console.log('Need some help here...');
});

/**
 * Parse args
 */

program.parse(process.argv);

/**
 * Setup
 */

var task = program.args[0];
if (!task) {
    return program.help();
}

var currentDir = process.cwd();
var configFile = program.config;
var configPath = resolve(currentDir, configFile);


/**
 * Commands
 */

program.command('genConfig')
    .description('Generate a default capture config file')
    .action(run('geoConfig'));

program.command('echo')
    .description('Display troubleshooting info')
    .action(run('echo'));

/**
 * Run
 */

function run (task) {
    read(configPath, function (err, buffer) {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('No backstop.json file found.');
            } else {
                console.log(err);
            }

            return;
        }

        var config = JSON.parse(buffer);
        var backstopInst = new Backstop(config);

        try {
            console.log('Running ' + task + '...');
            backstopInst[task]();
        } catch (e) {
            console.log(e);
        }
    });
}
