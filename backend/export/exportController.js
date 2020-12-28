const moment = require('moment');
class ExportController {
    constructor(serviceLocator) {
        this._exportService = serviceLocator.services.exportService;
    }

    async getTimes(ctx) {
        try {
            const times = await this._exportService.getTimes();
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
            ctx.body = times;
        } catch(err) {
            console.log(err);    
        }
    }
}

module.exports = ExportController;