var resemble = require('node-resemble-js'),
    async = require('async'),
    fs = require('fs');

// RUN REPORT
var report = function (data) {
    var resultConfig,
        backstop = this,
        paths = backstop.paths,
        statusFilter = 'none',
        testPairs = [],
        misMatchThresh = 1,
        testPairsCompleted = 0,
        passedCount = 0,
        testPairObj = function (a, b, c, o) {
            this.a = {
                src: a || '',
                srcClass: 'reference'
            };
            this.b = {
                src: b || '',
                srcClass: 'test'
            };
            this.c = {
                src: c || '',
                srcClass: 'diff'
            };
            this.report = null;
            this.processing = true;
            this.passed = false;
            this.meta = o;
        };

    resemble.outputSettings({
        errorColor: {red: 255, green: 0, blue: 255},
        errorType: 'movement',
        transparency: 0.1,
        largeImageThreshold: 1200
    });

    var compareTestPair = function (testPair, cb) {
        var testPairA = fs.readFileSync(testPair.a.src),
            testPairB = fs.readFileSync(testPair.b.src);

        testPair.processing = true;
        resemble(testPairA).compareTo(testPairB)
            .onComplete(function(diffData){
                testPair.report = JSON.stringify(diffData, null, 2);
                testPair.c.src = diffData.getDiffImage();
                testPair.processing = false;
                testPair.passed = (diffData.isSameDimensions &&
                    (diffData.misMatchPercentage < misMatchThresh)) ? true : false;
                if (cb !== 'undefined') {
                    cb(testPair);
                }
            });
    };

    var compareTestPairs = function (testPairs) {
        async.eachLimit(testPairs, 1, function (testPair, cb) {
            compareTestPair(testPair, function (o) {
                if (o.passed) {
                    passedCount++;
                }
                testPairsCompleted++;
                cb();
            });
        }, function () {
            if (passedCount === testPairsCompleted) {
                statusFilter = 'passed';
            } else {
                statusFilter = 'failed';
            }
        });
    };

    var runReport = function (err, data) {
        if (err) console.log(err);

        resultConfig = JSON.parse(data);
        resultConfig.testPairs.forEach(function (o, i, a) {
            testPairs.push(new testPairObj(o.reference, o.test, null, o));
        });

        compareTestPairs(testPairs);
    };

    fs.readFile(paths.compareConfigFileName, 'utf8', runReport);
};

module.exports = report;
