class TimeService {
    constructor(serviceLocator) {
        this._timeRepository = serviceLocator.repositories.timeRepository;
    }

    async getTimes() {
        try {
            const times = await this._timeRepository.getTimes();
            return times;
        } catch(err) {
            console.log(err);    
        }
    }
    
    async getTimeByUid(uid) {
        try {
            const time = await this._timeRepository.getTimeByUid(uid);
            return time;
        } catch(err) {
            console.log(err);    
        }
    }
    async addTime(uid, checkedSymptoms) {
        try {
            const response = await this._timeRepository.addTime(uid, checkedSymptoms);
            return response;
        } catch(err) {
            console.log(err);
        }
    }

    async updateTime(uid, timeOut) {
        try {
            const response = await this._timeRepository.updateTime(uid, timeOut);
            return response;
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = TimeService;