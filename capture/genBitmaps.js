var fs = require('fs'),
    Spooky = require('../../SpookyJS');

var genBitmaps = function (isReference, paths, config, cb) {
    var bitmaps_reference = paths.bitmaps_reference;
    var bitmaps_test = paths.bitmaps_test;
    var compareConfigFileName = paths.compareConfigFileName;

    var bsViewports = config.viewports;
    var bsScenarios = config.scenarios||config.grabConfigs;

    var compareConfig = {testPairs:[]};

    var spooky = new Spooky({
        child: {
            transport: 'http'
        },
        casper: {
            sslProtocol: 'any'
            // lets try not to use this it's friggin 2014 already people...
            // clientScripts: ["jquery.js"] 
        }
    }, function (err) {

        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }

        function pad(number) {
            var r = String(number);
            if ( r.length === 1 ) {
                r = '0' + r;
            }
            return r;
        }


        function capturePageSelectors(url,scenarios,viewports,bitmaps_reference,bitmaps_test,isReference){

            var screenshotNow = new Date(),
                screenshotDateTime = screenshotNow.getFullYear() + pad(screenshotNow.getMonth() + 1) + pad(screenshotNow.getDate()) + '-' + pad(screenshotNow.getHours()) + pad(screenshotNow.getMinutes()) + pad(screenshotNow.getSeconds());

            var consoleBuffer = '';
            var scriptTimeout = 20000;

            // Store vars on scenarios object to be accessbile in process:
            for (i=0;i < scenarios.length;i++) {
                scenarios[i].viewports = viewports;
                scenarios[i].scriptTimeout = scriptTimeout;
                scenarios[i].bitmaps_reference = bitmaps_reference;
                scenarios[i].bitmaps_test = bitmaps_test;
                scenarios[i].isReference = isReference;
                scenarios[i].screenshotDateTime = screenshotDateTime;
            }

            spooky.on('remote.message', function(message) {
                this.echo(message);
                consoleBuffer = consoleBuffer + '\n' + message;
            });

            spooky.start();

            spooky.each(scenarios,function(spooky, scenario, scenario_index){
                spooky.each(scenario.viewports, function(spooky, vp, viewport_index) {
                    this.then(function() {
                        this.viewport(vp.width||vp.viewport.width, vp.height||vp.viewport.height);
                    });
                    this.thenOpen(scenario.url, function() {

                        spooky.waitFor(
                            function(){ //test
                                if(!scenario.readyEvent)return true;
                                var regExReadyFlag = new RegExp(scenario.readyEvent,'i');
                                return consoleBuffer.search(regExReadyFlag)>=0;
                            }, function(){//on done
                                consoleBuffer = '';
                                spooky.echo('Ready event received.');
                            }, function(){//on timeout
                                spooky.echo('ERROR: spooky timeout.');
                            }, scenario.scriptTimeout);
                        spooky.wait(scenario.delay||1);

                    });
                    spooky.then(function() {
                        this.echo('Current location is ' + scenario.url, 'info');

                        //var src = this.evaluate(function() {return document.body.outerHTML; });
                        //this.echo(src);
                    });

                    this.then(function(){

                        this.echo('Screenshots for ' + vp.name + ' (' + vp.width||vp.viewport.width + 'x' + vp.height||vp.viewport.height + ')', 'info');

                        //HIDE SELECTORS WE WANT TO AVOID
                        if ( scenario.hasOwnProperty('hideSelectors') ) {
                                scenario.hideSelectors.forEach(function(o,i,a){
                                    spooky.evaluate(function(o){
                                        Array.prototype.forEach.call(document.querySelectorAll(o), function(s, j){
                                            s.style.visibility='hidden';
                                        });
                                    },o);
                                });
                        }

                        //REMOVE UNWANTED SELECTORS FROM RENDER TREE
                        if ( scenario.hasOwnProperty('removeSelectors') ) {
                                scenario.removeSelectors.forEach(function(o,i,a){
                                    spooky.evaluate(function(o){
                                        Array.prototype.forEach.call(document.querySelectorAll(o), function(s, j){
                                            s.style.display='none';
                                        });
                                    },o);
                                });
                        }

                        //CREATE SCREEN SHOTS AND TEST COMPARE CONFIGURATION (CONFIG FILE WILL BE SAVED WHEN THIS PROCESS RETURNS)
                        // If no selectors are provided then set the default 'body'
                        if ( !scenario.hasOwnProperty('selectors') ) {
                          scenario.selectors = [ 'body' ];
                        }
                        scenario.selectors.forEach(function(o,i,a){
                            var cleanedSelectorName = o.replace(/[^a-zA-Z\d]/,'');//remove anything that's not a letter or a number
                            var fileName = scenario_index + '_' + i + '_' + cleanedSelectorName + '_' + viewport_index + '_' + vp.name + '.png';

                            var reference_FP = scenario.bitmaps_reference + '/' + fileName;
                            var test_FP = scenario.bitmaps_test + '/' + scenario.screenshotDateTime + '/' + fileName;

                            var filePath = (scenario.isReference)?reference_FP:test_FP;

                            if(!scenario.isReference) {
                                spooky.emit('compareConf', {
                                    reference:reference_FP,
                                    test:test_FP,
                                    selector:o,
                                    fileName:fileName,
                                    label:scenario.label
                                });
                            }

                            spooky.captureSelector(filePath, o);
                            //spooky.echo('remote capture to > '+filePath,'info');

                        });//end topLevelModules.forEach

                    });

                });//end spooky.each viewports

            });//end spooky.each scenario

        }

        capturePageSelectors('index.html',
                             bsScenarios,
                             bsViewports,
                             bitmaps_reference,
                             bitmaps_test,
                             isReference);

        spooky.run(function(){
            this.exit();
        });
    });

    spooky.on('compareConf', function (results) {
        compareConfig.testPairs.push(results);
    });

    // spooky.on('console', function (line) {
    //     console.log(line);
    // });

    spooky.on("error", function(msg, trace) {
        console.log(msg);

        if (trace) {
            console.log(trace);
        }

        cb(msg.code);
    });

    spooky.on("exit", function (status) {
        var configData = JSON.stringify(compareConfig,null,2),
            writeComplete = function () {
                console.log('Comparison config file updated:\n', configData);
                cb(0);
            };

        if (status) {
            console.log('Exited with status:', status);
        }

        fs.writeFile(compareConfigFileName, configData, writeComplete);
    });

    // spooky.on("page.error", function(msg, trace) {
        // this.echo("Remote Error >    " + msg, "error");
        // this.echo("file:     " + trace[0].file, "WARNING");
        // this.echo("line:     " + trace[0].line, "WARNING");
        // this.echo("function: " + trace[0]["function"], "WARNING");
    // });

    spooky.on('remote.message', function(message) {
        this.echo('remote console > ' + message);
    });

    spooky.on('resource.received', function(resource) {
        var status = resource.status;
        if(status >= 400) {
            spooky.log('remote error > ' + resource.url + ' failed to load (' + status + ')', 'error');
        }
    });


    //========================
    //this query should be moved to the prior process
    //`isReference` could be better passed as env parameter
    // var exists = fs.exists(bitmaps_reference);
    // var isReference = false;
    if (isReference) {
        /* isReference=true; */
        console.log('CREATING NEW REFERENCE FILES');
    }
    //========================
};

module.exports = genBitmaps;
