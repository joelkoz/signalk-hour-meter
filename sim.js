const Plugin = require('./index.js');
const MockApp = require('./mocks.js').MockApp;


(function() {

    const dataPath = "/Users/Joel/Workspaces/nodejs/signalk/data";

    const genTempPath = 'electrical.generator.engine.coolantTemperature';

    var app = new MockApp(dataPath)

    var plugin = new Plugin(app);
    
    var options = {
       devices: [
            {
                name: 'Generator',
                skMonitorPath: genTempPath,
                secTimeout: 5,
                skHoursPath: 'electrical.generator.engine.runTime',
                skStatusPath: 'electrical.generator.engine.status',
                offsetHours: 2989.9,
                secReportInterval: 3
            }
       ]    
    };

    plugin.start(options);


    var simTimer;

    function startGenSim() {
        console.log('Starting generator sim');

        simTimer = setInterval(function() {
            app.streambundle.pushMockValue(genTempPath, { value: 325.7 });
        }, 2000);


        setTimeout(function() {
            clearInterval(simTimer);
        }, 17000);

        setTimeout(endGenSim, 29000);
    }


    function endGenSim() {
        console.log('Runtime history: ');
        var history = plugin.getHandler('generator').getHistory();
        console.log(JSON.stringify(history, null, 2));
        
        console.log('Stopping...');
        plugin.stop();
        console.log('Stopped');
        process.exit(0);
    }

    setTimeout(startGenSim, 5000);

})();
