module.exports = function (task, config) {
    console.log('Running ' + task + '...');
    console.log(config);
    var done = function () {
        process.exit(0);
    };

    require('./' + task + '.js')(done);
};
