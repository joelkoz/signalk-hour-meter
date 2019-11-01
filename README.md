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

## Configuration
To configure a new device, select `Server -> Plugin Config -> Hour meter` from the node server menu. To add a new device definition, press the blue **+** button.  You can define more than one device if you would like. Simply repeat this step for each device you want to track.

The `Device name` is both a name you make up for the device, as well as an identifier used for the device in the Json API to retrieve history
reports via software. You can include spaces and punctuation
in the device name if you wish (they will be removed to create the device identifier), but once you set the name and start collecting data, do not
change it.  The device identifier, which is derived from the `Device name` is also used for the file name for the history storage.  Changing the name will cause a new history file to be created, losing all your previous data.

The `SignalK value that indicates device is on` is the SignalK path that is monitored by the plugin to determine if the device is on. This
value should already be created and reported by some other component of your system

The `SignalK timeout (secs)` is the number of seconds of "data silence" the hour meter plugin should tolerate before assuming the device has
been turned off.  The smaller this number, the quicker the plugin can determine the device has actually been turned off. However, you don't want
it so small that the plugin starts reporting sporadic 'on/off/on' situations.  The default value of 30 seconds is usually a good number.

The `SignalK path to output hour meter data` indicates the SignalK path the plugin will use to report total "life to date" run time. Note
that the existing SignalK specification already has definitions for many paths you may want to use.  They all end in `runTime`, so if
you do end up making up a new path, ending the name in `runTime` will at least stay consistent.  If you leave this field blank, no run time
data will be reported on the SignalK stream.  The plugin will still log run history, and can still report the status (below) if that path
is defined.

The `SignalK path to output device status` is used to report "ON" or "OFF" on the SignalK data stream.  If you do not want this report,
leave this field blank.

The `Hours already on device` allows you to enter a starting hour count for the device. This is useful if you have an analog hour meter
on the device you can take a reading off of.  You can periodically adjust this value if the reported hours starts to drift from the
actual hours.  The hour meter plugin always reports total run time as "monitored run time plus hours already on device", so changing
this value after run time data has already recorded will in fact change the hours reported.

The `Reporting interval (secs)` indicates how often the run time and/or status will be sent over the SignalK data stream when the
device is on.

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
