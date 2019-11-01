# SignalK-Hour-Meter
SignalK Hour Meter is a plugin and corresponding Webapp for the [SignalK Node Server](https://github.com/SignalK/signalk-server-node) that monitors
the run time of devices on your boat by watching for related SignalK data that indicates the device is currently on.  For example, one of the
most common uses is an engine hour meter: this plugin can track and generate `propulsion.0.runTime` values based on the presense of
non-zero values for `propulsion.0.revolutions`.  The plugin then allows you to retrieve run histories of the device using its WebApp user
interface. You can also programatically retrieve run history using a Json API.


## How it works
You define one or more devices for the hour meter plugin to track by using the plugin configuration panel of the node server.  Each device that is
tracked needs to already produce some type of numeric SignalK data that can be monitored to indicate it is on. Any value greater than zero is assumed to indicate the device is on.  The device will be assumed off if the monitored value is zero, or if an update has not been received after a timeout
that you specify.  Based on the monitored value, the plugin will emit both a total *runTime* value, as well as an optional *status* value that is
a simple "ON" or "OFF"

## Reviewing the Data
The Hour Meter plugin installs a simple Webapp interface that allows you to review the data it has recorded. You can
view this data in a web browser using the path `/signalk-hour-meter`.  For example:

```
http://my-server.local/signalk-hour-meter
```

It is also available to be selected from the *Webapps* menu option of the Node Server.

## API
You can also retrieve data using one of the two following API calls:

### Get device list
```
http://my-server.local/plugins/signalk-hour-meter/api/devices
```

will return a json array of the device Ids that are defined.

### Get device history
```
http://my-server.local/plugins/signalk-hour-meter/api/history/<deviceId>
```

where `<deviceId>` is one of the ids returned by the `/plugins/api/devices` call.  The `/plugins/api/history/<deviceId>` allows for
two optional `start` and `end` query parameters that lets you retrieve a small subset of history items:


Example:
```
http://my-server.local/plugins/signalk-hour-meter/api/history/portEngine?start=2019-10-01&end=2019-11-01
```
