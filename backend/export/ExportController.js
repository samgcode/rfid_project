const moment = require('moment');
const fs = require('fs');
const stringify = require('csv-stringify');
const logger = require('logger').createLogger({className: __filename});
class ExportController {
    constructor(serviceLocator) {
        this._exportService = serviceLocator.services.exportService;
    }

    async getSymptomScanTimes(ctx) {
        try {
            const symptomScanTimes = await this._exportService.getSymptomScanTimes();
            this.writeData(symptomScanTimes);
            ctx.body = symptomScanTimes;
        } catch(err) {
            ctx.throw(err);    
        }
    }

    async getSymptomScanTimesByDate(ctx) {
        try {
            const { startDate, endDate } = ctx.params;
            const start = new Date(startDate);
            const end = new Date(endDate);
            logger.info(`startDate: ${start}, endDate: ${end}`);
            const symptomScanTimes = await this._exportService.getSymptomScanTimesByDate(start, end);
            this.writeData(symptomScanTimes);
            ctx.body = symptomScanTimes;
        } catch(err) {
            ctx.throw(err);    
        }
    }

    async writeData(input) {
        stringify(input, 
            {
                header: true,
                cast: {
                    date: function (value) {
                        return value.toISOString()
                    }
                }
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