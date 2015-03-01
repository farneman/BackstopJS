#!/usr/bin/env node
var Liftoff = require('liftoff'),
    argv = require('minimist')(process.argv.slice(2));

var Backstop = new Liftoff({
    name: 'backstop',
    moduleName: 'backstopjs',
    configName: 'backstop',
    extensions: {
        '.json': null
    }
});

Backstop.launch({
    cwd: argv.cwd,
    configPath: argv.config,
    require: argv.require
}, invoke);

function invoke (env) {
    var backstop,
        task = argv._[0],
        tasks = [
            'bless',
            'clean',
            'echo',
            'genConfig',
            'init',
            'openReport',
            'reference',
            'report',
            'start',
            'stop',
            'test'
        ];

    console.log(process.cwd(), env.cwd);
    if (process.cwd() !== env.cwd) {
        process.chdir(env.cwd);
        console.log('Working directory changed to', env.cwd);
    }

    if (!env.modulePath) {
        console.log('Local backstop not found in:', env.cwd);
        process.exit(1);
    }
    backstop = require(env.modulePath);

    if (tasks.indexOf(task) == -1) {
        console.log('\'' + task + '\' is not a backstop command');
        process.exit(1);
    }

    if (env.configPath) {
        backstop(task, require(env.configPath));
    } else {
        console.log('No backstop.json found.');
    }
}
