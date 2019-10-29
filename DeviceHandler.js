const _ = require('lodash');
const DBRunLog = require('./DBRunLog.js');

class DeviceHandler {

    constructor(skPlugin, config) {
        this.skPlugin = skPlugin;
        this.config = config;
        this.id = _.camelCase(config.name);
        this.skStream = skPlugin.getSKValues(config.skMonitorPath);
        skPlugin.subscribeVal(this.skStream, this.onMonitorValue, this);

        this.log = new DBRunLog();

        this.readTotalTime();

        this.reportSK();
    }    

    readTotalTime() {
        let status = `Reading run history for ${this.config.name}`;
        this.skPlugin.debug(status);
        this.skPlugin.setStatus(status);
        this.openFile();
        this.totalSeconds = 0;
        this.deviceOn = false;
        this.lastRecordedTime = 0;
        this.log.forEach((rec, recNum) => {
            let secs = this.elapsedSecs(rec.startTime, rec.endTime);
            this.totalSeconds += secs;
            this.deviceOn = (rec.status == 1);
            if (this.deviceOn) {
                this.lastRecordedTime = rec.endTime;
            }
        });
        this.closeFile();
        this.lastValueReceived = this.skPlugin.getTime();
        this.skPlugin.debug(`Previous seconds on ${this.config.name}: ${this.totalSeconds}`);
    }


    stop() {
        this.skPlugin.debug(`Stopping ${this.config.name}`);
        this.updateLog(false);
    }



    getTotalTime() {
        return this.totalSeconds + (this.config.offsetHours * 3600);
    }


    openFile() {
        this.log.open(this.getDataFileName());
    }


    closeFile() {
        this.log.close();
    }


    getDataFileName() {
        return `${this.skPlugin.dataDir}/${this.id}.dat`;
    }


    onHeartbeat(timer) {
        if (this.deviceOn && this.elapsedSecs(this.lastValueReceived) >= this.config.secTimeout) {
            this.updateLog(false);
        }

        if (this.elapsedSecs(this.lastSKReport) >= this.config.secReportInterval) {
            this.reportSK();
        }
    }


    elapsedSecs(t1, t2) {
        if (_.isUndefined(t2)) {
            t2 = this.skPlugin.getTime();
        }
        return Math.round((t2 - t1) / 1000);
    }

    onMonitorValue(val) {
        this.skPlugin.debug(`onMonitorValue(${JSON.stringify(val)})`);
        this.lastValueReceived = this.skPlugin.getTime();
        this.updateLog(val > 0);
    }


    updateLog(deviceOn) {
        if (deviceOn || this.deviceOn != deviceOn) {
            // An update to the run log is needed
            this.openFile();
            this.log.getLast();
            if (deviceOn) {
                if (this.log.rec.status != 1) {
                    // Current record is not live - We need a NEW run record...
                    this.skPlugin.debug(`Creating new run log for ${this.config.name}`);
                    this.log.appendNewRun();
                    this.lastRecordedTime = this.log.rec.endTime;
                }
                let now = this.skPlugin.getTime();
                let newSecs = this.elapsedSecs(this.lastRecordedTime, now);
                if (newSecs >= 5) {
                    if (this.lastRecordedTime > 0) {
                        this.skPlugin.debug(`Update run log for ${this.config.name} with ${newSecs} more seconds`);
                        this.log.rec.endTime = now;
                        this.log.update();
                        this.totalSeconds += newSecs;
                    }
                    this.lastRecordedTime = now;
                }
            }
            else {
                // Change status to "off"
                this.skPlugin.debug(`Device ${this.config.name} is now OFF`);
                if (this.log.rec.status == 1) {
                    this.log.rec.status = 0;
                    this.log.update();
                }
            }
            this.closeFile();
            this.deviceOn = deviceOn;
        }
    }



    reportSK() {
        var values = [];

        if (!_.isEmpty(this.config.skHoursPath)) {
            values.push(
                { path: this.config.skHoursPath, value: this.getTotalTime() }
            );
        }

        if (!_.isEmpty(this.config.skStatusPath)) {
            values.push(
                { path: this.config.skStatusPath, value: (this.deviceOn ? 'ON' : 'OFF') }
            );
        }

        if (!_.isEmpty(values)) {
            this.skPlugin.sendSKValues(values);
        }
        
        this.lastSKReport = this.skPlugin.getTime();
    }
}

module.exports = DeviceHandler;