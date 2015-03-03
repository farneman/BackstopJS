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

program.command('bless')
    .description('Bless the current capture config')
    .action(run('bless'));

program.command('clean')
    .description('Clean the bitmaps_reference directory')
    .action(run('clean'));

program.command('clean')
    .description('Clean the bitmaps_reference directory')
    .action(run('clean'));

program.command('echo')
    .description('Display troubleshooting info')
    .action(run('echo'));

program.command('genConfig')
    .description('Generate a default capture config file')
    .action(run('geoConfig'));

program.command('init')
    .description('Manage dependencies')
    .action(run('init'));

program.command('openReport')
    .description('Open the report in a browser')
    .action(run('openReport'));

program.command('reference')
    .description('Create a new set of reference bitmaps')
    .action(run('reference'));

program.command('report')
    .description('View the report')
    .action(run('report'));

program.command('start')
    .description('Start the local web server')
    .action(run('start'));

program.command('stop')
    .description('Stop the local web server')
    .action(run('stop'));

program.command('test')
    .description("This task will generate a date-named directory with DOM screenshot files as specified in `./capture/config.json` followed by running a report.\n\n NOTE: If there is no bitmaps_reference directory or if the bitmaps_reference directory is empty then a new batch of reference files will be generated in the bitmaps_reference directory.  Reporting will be skipped in this case.")
    .action(run('test'));

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
