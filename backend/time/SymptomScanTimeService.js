const logger = require('logger').logger;

class SymptomScanTimeService {
    constructor(serviceLocator) {
        this._symptomScanTimeRepository = serviceLocator.repositories.symptomScanTimeRepository;
    }

    async getSymptomScanTimes() {
        try {
            const symptomScanTimes = await this._symptomScanTimeRepository.getSymptomScanTimes();
            return symptomScanTimes;
        } catch(err) {
            logger.error(err);    
        }
    }
    
    async getSymptomScanTimeByUid(uid) {
        try {
            const symptomScanTime = await this._symptomScanTimeRepository.getSymptomScanTimeByUid(uid);
            return symptomScanTime;
        } catch(err) {
            logger.error(err);    
        }
    }

    async getSymptomScanTimeByDateUid(uid, date) {
        try {
            const symptomScanTime = await this._symptomScanTimeRepository.getSymptomScanTimeByDateUid(uid, date);
            return symptomScanTime;
        } catch(err) {
            logger.error(err);    
        }
    }
    async addSymptomScanTime(uid, checkedSymptoms) {
        try {
            const response = await this._symptomScanTimeRepository.addSymptomScanTime(uid, checkedSymptoms);
            return response;
        } catch(err) {
            logger.error(err);
        }
    }

    async updateSymptomScanTime(uid) {
        try {
            const response = await this._symptomScanTimeRepository.updateSymptomScanTime(uid);
            return response;
        } catch(err) {
            logger.error(err);
        }
    }

    async updateCheckedByDate(uid, checkedSymptoms, date) {
        try {
            const response = await this._symptomScanTimeRepository.updateCheckedByDate(uid, checkedSymptoms, date);
            return response;
        } catch(err) {
            logger.error(err);
        }
    }

    async removeOldRecords() {
        try {
            const response = await this._symptomScanTimeRepository.removeOldRecords();
            return response;
        } catch(err) {
            logger.error(err);
        }
    }
}

module.exports = SymptomScanTimeService;