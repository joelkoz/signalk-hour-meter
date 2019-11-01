var Globalize = require("globalize");

module.exports = {
    formatDate: Globalize.dateFormatter({ datetime: "short" }),
    formatNumber: Globalize.numberFormatter({ maximumFractionDigits: 2 }),
    msgHourMeter: Globalize.formatMessage('hourMeter')
}
