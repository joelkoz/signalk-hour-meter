const Bacon = require('baconjs');
const SignalKPlugin = require('signalk-plugin-base');
const DeviceHandler = require('./DeviceHandler.js');


class HourMeterPlugin extends SignalKPlugin {

  constructor(app) {
    super(app, 'signalk-hour-meter', 'Hour meter', 'Synthesizes hour meter data when other SignalK values indicate a device is on');

    this.optObj('devices', 'Devices to synthesize hour meters', true, undefined, 'Device');
    this.optStr('name', 'Device name', '');    
    this.optStr('skMonitorPath', 'SignalK value that indicates device is on', '');
    this.optInt('secTimeout', 'SignalK timeout (secs)', 60, false, 'The number of seconds of no SignalK data before device assumed off');
    this.optStr('skHoursPath', 'SignalK path to output hour meter data', '', false, 'Leave blank to disable');
    this.optStr('skStatusPath', 'SignalK path to output device status', '', false, 'Leave blank to disable');
    this.optNum('offsetHours', 'Hours already on device', 0);
    this.optInt('secReportInterval', 'Reporting interval (secs)', 30, false, 'Number of seconds between each hour meter/status report');
    this.optObjEnd();

    this.unsub = [];
    this.handlers = [];
  }


  // Initialization of data streams and properties are done here...
  onPluginStarted() {
          
     // This is for API demonstration only (see registerWithRouter())
     this.pluginStarted = this.getTime();
     
     var heartbeatInterval = 2000;
     this.evtHeartbeat = Bacon.fromPoll(heartbeatInterval, () => { return this.getTime() });

     this.handlers = [];

     for (var device of this.options.devices) {
        if (device.name && device.skMonitorPath)
        this.debug(`Configuring device ${device.name}`);
        let handler = new DeviceHandler(this, device);
        this.subscribeVal(this.evtHeartbeat, handler.onHeartbeat, handler);
        this.handlers.push(handler);
     }

     this.setStatus('Started');

  }



  onPluginStopped() {
     for (var handler of this.handlers) {
        handler.stop();
     }
  }


  getHandler(id) {
     var retVal = null;
     for (var handler of this.handlers) {
        if (handler.id === id) {
          retVal = handler;
        }
     }
     return retVal;
  }


  /**
   * This is where RESTul API call responses are defined...
   * @param {object} router An ExpressJS "Router" object
   * @see https://expressjs.com/en/guide/routing.html
   */
  registerWithRouter(router) {

    this.debug("Registering routes...");
    router.get("/api/devices", (req, res) => {
        if (this.running) {
          let jReturnVal = [];
          for (var handler of this.handlers) {
            jReturnVal.push(handler.id);
          }
          this.debug(`Returning JSON value ${JSON.stringify(jReturnVal)}`)
          res.json(jReturnVal);
        }
        else {
          res.status(503).send('Plugin not running');
        }
    });

    router.get("/api/history/:deviceId", (req, res) => {
      if (this.running) {
          var handler = this.getHandler(req.params.deviceId);
          if (handler != null) {
              let jReturnVal = handler.getHistory(req.params.start, req.params.end);
              this.debug(`Returning JSON value ${JSON.stringify(jReturnVal)}`)
              res.json(jReturnVal);
          }
          else {
            res.status(404).send(`Unknown device [${req.params.deviceId}]`);          
          }
        }
        else {
          res.status(503).send('Plugin not running');
        }
    });

  }



 // The plugin schema
  // schema() { 
  //   return { type: 'object',
  //             properties: {
  //               globalSetting: {
  //                 type: 'string',
  //                 title: 'Depth measurement SignalK path',
  //                 default: 'environment.depth.belowSurface'
  //               },
  //               devices: {
  //                 type: 'array',
  //                 title: 'Devices to syntheisze hour meters',
  //                 items: { title: "Device",
  //                          type: "object",
  //                          properties: {
  //                              skMonitorPath: { type: "string",
  //                                               title: 'SignalK path that indicates device is on',
  //                                               default: ''
  //                                             },
  //                              skOutputPath: { type: "string",
  //                                             title: 'SignalK path to output hour meter data',
  //                                             default: ''
  //                                           },
  //                              offsetHours: { type: 'number',
  //                                             title: 'Hours already on device',
  //                                             default: 0
  //                                           },
  //                              secTimeout: { type: 'number',
  //                                            title: 'SignalK timeout',
  //                                            description: 'The number of seconds of no SignalK data before device assumed off',
  //                                            default: 60
                                 
  //                              }
  //                        }
  //                 }
  //               },
  //             }
  //         };
  // }



};


module.exports = function (app) {
  var plugin = new HourMeterPlugin(app);
  return plugin;
}