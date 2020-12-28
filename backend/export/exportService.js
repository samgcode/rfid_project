class ExportService {
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
    
    async getTimesByDate(startDate, endDate) {
        try {
            const times = await this._timeRepository.getTimesByDate(startDate, endDate);
            return times;
        } catch(err) {
            console.log(err);    
        }
    }
}

module.exports = ExportService;