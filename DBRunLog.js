const FixedRecordFile = require("structured-binary-file").FixedRecordFile;
const Parser = require("binary-parser-encoder").Parser;

class DBRunLog extends FixedRecordFile {

    // A running log of start/stop times of each device run
    constructor() {
        super(Parser.start()
                    .int8("status")
                    .double("startTime")
                    .double("endTime"));
        this.rec = {};
        this.rec.status = 0;
        this.rec.startTime = 0;
        this.rec.endTime = 0;
    }

    get recNumber() {
        return this.recordCount() - 1;
    }

    getLast() {
        if (this.recordCount() > 0) {
            this.rec = this.readRecord(this.recNumber);
        }
        else {
            this.appendNewRun();
        }
    }


    appendNewRun() {
        this.rec.status = 1;
        this.rec.startTime = new Date().getTime();;
        this.rec.endTime = this.rec.startTime;
        this.appendRecord(this.rec);
    }


    update() {
        if (this.recNumber >= 0) {
            this.writeRecord(this.recNumber, this.rec);
        }
    }

};



module.exports = DBRunLog;