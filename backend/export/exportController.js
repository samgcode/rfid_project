const moment = require('moment');
const fs = require('fs');
const stringify = require('csv-stringify');
class ExportController {
    constructor(serviceLocator) {
        this._exportService = serviceLocator.services.exportService;
    }

    async getTimes(ctx) {
        try {
            const times = await this._exportService.getTimes();
            this.writeData(times);
            ctx.body = times;
        } catch(err) {
            console.log(err);    
        }
    }

    async getTimesByDate(ctx) {
        try {
            const { startDate, endDate } = ctx.request.body;
            const start = moment.utc(startDate).toDate();
            const end = moment.utc(endDate).toDate();
            const times = await this._exportService.getTimesByDate(start, end);
            this.writeData(times);
            ctx.body = times;
        } catch(err) {
            console.log(err);    
        }
    }

    async writeData(input) {
        input.map(time => {
            time.timeIn = moment(time.timeIn).toString();
            time.timeOut = moment(time.timeOut).toString();
            return time;
        });
        stringify(input, {
            header: true
        }, function(err,data) {
            if(err){ throw (err) }
            const fileName = 'output.csv';
            fs.writeFile(`./output/${fileName}`, data, {flag: 'w'}, function(err) {
                if(err) { throw err }
            });
        })
    }
}

module.exports = ExportController;