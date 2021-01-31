const { createIndexes } = require("../users/UserModel");

class ExportService {
    constructor(serviceLocator) {
        this._symptomScanTimeRepository = serviceLocator.repositories.symptomScanTimeRepository;
    }
    async getSymptomScanTimes() {
        try {
            const symptomScanTimes = await this._symptomScanTimeRepository.getSymptomScanTimes();
            return symptomScanTimes;
        } catch(err) {
            ctx.throw(err);    
        }
    }
    
    async getSymptomScanTimesByDate(startDate, endDate) {
        try {
            const symptomScanTimes = await this._symptomScanTimeRepository.getSymptomScanTimesByDate(startDate, endDate);
            return symptomScanTimes;
        } catch(err) {
            ctx.throw(err);    
        }
    }
}

module.exports = ExportService;