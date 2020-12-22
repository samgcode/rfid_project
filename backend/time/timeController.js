
class TimeController {
    constructor(serviceLocator) {
        this._timeRepository = serviceLocator.repositories.timeRepository;
    }

    async getTimes(ctx) {
        const times = await this._timeRepository.getTimes();
        ctx.body = times;
    }
}

module.exports = TimeController;