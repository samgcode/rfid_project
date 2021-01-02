class SymptomScanTimeService {
    constructor(serviceLocator) {
        this._symptomScanTimeRepository = serviceLocator.repositories.symptomScanTimeRepository;
    }

    async getSymptomScanTimes() {
        try {
            const symptomScanTimes = await this._symptomScanTimeRepository.getSymptomScanTimes();
            return symptomScanTimes;
        } catch(err) {
            console.log(err);    
        }
    }
    
    async getSymptomScanTimeByUid(uid) {
        try {
            const symptomScanTime = await this._symptomScanTimeRepository.getSymptomScanTimeByUid(uid);
            return symptomScanTime;
        } catch(err) {
            console.log(err);    
        }
    }
    async addSymptomScanTime(uid, checkedSymptoms) {
        try {
            const response = await this._symptomScanTimeRepository.addSymptomScanTime(uid, checkedSymptoms);
            return response;
        } catch(err) {
            console.log(err);
        }
    }

    async updateSymptomScanTime(uid) {
        try {
            const response = await this._symptomScanTimeRepository.updateSymptomScanTime(uid);
            return response;
        } catch(err) {
            console.log(err);
        }
    }

    async updateChecked(uid, checkedSymptoms) {
        try {
            const response = await this._symptomScanTimeRepository.updateChecked(uid, checkedSymptoms);
            return response;
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = SymptomScanTimeService;