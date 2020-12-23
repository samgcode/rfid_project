
class TimeController {
    constructor(serviceLocator) {
        this._timeRepository = serviceLocator.repositories.timeRepository;
    }

    async getTimes(ctx) {
        try {
            const times = await this._timeRepository.getTimes();
            ctx.body = times;
        } catch(err) {
            console.log(err);    
        }
    }
    
    async getTimeById(ctx) {
        try {
            const uid = ctx.params.uid;
            const time = await this._timeRepository.getTimeByUid(uid);
            ctx.body = time;
        } catch(err) {
            console.log(err);    
        }
    }

    async updateTime(ctx) {
        try {
            const { uid, timeOut } = ctx.request.body;
            await this._timeRepository.updateTime(uid, timeOut);
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = TimeController;