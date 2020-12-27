
class TimeController {
    constructor(serviceLocator) {
        this._timeService = serviceLocator.services.timeService;
    }

    async getTimes(ctx) {
        try {
            const times = await this._timeService.getTimes();
            ctx.body = times;
        } catch(err) {
            console.log(err);    
        }
    }
    
    async getTimeById(ctx) {
        try {
            const uid = ctx.params.uid;
            const time = await this._timeService.getTimeByUid(uid);
            ctx.body = time;
        } catch(err) {
            console.log(err);    
        }
    }
    async addTime(ctx) {
        try {
            const { uid, checkedSymptoms } = ctx.request.body;
            const response = await this._timeService.addTime(uid, checkedSymptoms);
            ctx.body = response;
        } catch(err) {
            console.log(err);
        }
    }

    async updateTime(ctx) {
        try {
            const { uid } = ctx.request.body;
            const response = await this._timeService.updateTime(uid);
            ctx.body = response;
        } catch(err) {
            console.log(err);
        }
    }

    async updateChecked(ctx) {
        try {
            const { uid, checkedSymptoms } = ctx.request.body;
            const response = await this._timeService.updateChecked(uid, checkedSymptoms);
            ctx.body = response;
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = TimeController;