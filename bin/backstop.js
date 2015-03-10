#!/usr/bin/env node
var program = require('commander'),
    read = require('read-file-stdin'),
    path = require('path'),
    resolve = path.resolve,
    Backstop = require('..');

// TODO Resolve using only config or path or allowing either

/**
 * Usage
 */

program.version(require('../package.json').version)
    .usage('<command>')
    .option('-p, --path <path>', 'location of backstop files', './')
    .option('-c, --config <path>', 'configration file location', './backstop.json');

/**
 * Help/examples
 */

// program.on('--help', function () {
//     console.log('Need some help here...');
// });

/**
 * Commands
 */

program.command('bless')
    .description('Bless the current capture config')
    .action(run);

program.command('clean')
    .description('Clean the bitmaps_reference directory')
    .action(run);

program.command('clean')
    .description('Clean the bitmaps_reference directory')
    .action(run);

program.command('echo')
    .description('Display troubleshooting info')
    .action(run);

program.command('genConfig')
    .description('Generate a default capture config file')
    .action(run);

program.command('init')
    .description('Manage dependencies')
    .action(run);

program.command('openReport')
    .description('Open the report in a browser')
    .action(run);

program.command('reference')
    .description('Create a new set of reference bitmaps')
    .action(run);

program.command('report')
    .description('View the report')
    .action(run);

program.command('start')
    .description('Start the local web server')
    .action(run);

program.command('stop')
    .description('Stop the local web server')
    .action(run);

program.command('test')
    .description("This task will generate a date-named directory with DOM screenshot files as specified in your backstop.json followed by running a report.\n\n NOTE: If there is no bitmaps_reference directory or if the bitmaps_reference directory is empty then a new batch of reference files will be generated in the bitmaps_reference directory.  Reporting will be skipped in this case.")
    .action(run);

/**
 * Parse args
 */

program.parse(process.argv);

/**
 * Setup
 */

if (!program.args.length) {
    return program.help();
}


/**
 * Run
 */

function run (cmd, options) {
    var task = program.args[0].name(),
        currentDir = process.cwd(),
        configFile = program.config,
        configPath = resolve(currentDir, configFile),
        runTask = function (config) {
            var backstopInst = new Backstop(program.path, config);

            try {
                console.log('Running ' + task + '...');
                backstopInst[task]();
            } catch (e) {
                console.log(e);
            }
        };

    if (task === 'genConfig') {
        runTask();
    } else {
        read(configPath, function (err, buffer) {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error('No backstop.json file found.');
                } else {
                    console.error(err);
                }

                return;
            }

            var config = JSON.parse(buffer);

            runTask(config);
        });
    }
}
