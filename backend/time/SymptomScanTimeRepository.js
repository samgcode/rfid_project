const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');
const moment = require('moment');

const filePath = './data/symptomScanTimes.csv';

class SymptomScanTimeRepository {
    constructor() {
       this._data;
       this._written = false;
    }   
    async readFile() {
        if(!this._written) {
            const fileContent = await fs.readFile(filePath);
            this._data = parse(fileContent, {columns: true});
            this._data.map(element => {
                element.timeIn = moment.utc(element.timeIn).toDate();
            })
        } else {
            return this._data;
        }
    }

    async getSymptomScanTimes() {
        await this.readFile();
        return this._data;
    } 

    async getSymptomScanTimeByUid(uid) {
        await this.readFile();
        let symptomScanTime;
        this._data.forEach(element => {
            if(element.uid === uid) {
                symptomScanTime = element;
            }
        });
        return symptomScanTime;
    }

    async getSymptomScanTimeByDateUid(uid, date) {
        await this.readFile();

        let symptomScanTimeOut;
        this._data.forEach(symptomScanTime => {
            if(symptomScanTime.uid === uid) {
                const time = moment(symptomScanTime.timeIn);
                if(time.isSame(moment(date), 'day')) {
                    symptomScanTimeOut = symptomScanTime;
                }
            }
        });
        return symptomScanTimeOut;
    }

    async getSymptomScanTimesByDate(startDate, endDate) {
        await this.readFile();

        let symptomScanTimes = [];
        this._data.forEach(symptomScanTime => {
            const time = moment(symptomScanTime.timeIn);
            const isAfter = time.isAfter(moment(startDate), 'day');
            const isBefore = time.isBefore(moment(endDate), 'day');
            if(isAfter && isBefore) {
                symptomScanTimes.push(symptomScanTime);
            }
        })

        return symptomScanTimes;
    }
    
    async addSymptomScanTime(uid, checkedSymptoms) {
        await this.readFile();
        this._written = true;
        const time = new Date();
        this._data.push({
            uid: uid,
            timeIn: time,
            timeOut: '',
            checkedSymptoms: checkedSymptoms,
        });
        return `Added: ${uid}`;
    }

    async updateSymptomScanTime(uid) {
        await this.readFile();
        this._written = true;
        
        const date = moment();

        this._data.forEach(symptomScanTime => {
            if(symptomScanTime.uid === uid) {
                const time = moment(symptomScanTime.timeIn);
                if(time.isSame(date, 'day')) {
                    symptomScanTime.timeOut = new Date();
                }
            }
        });
        return `Updated: ${uid}`;
    }

    async updateCheckedByDate(uid, checkedSymptoms, date) {
        await this.readFile();
        this._data.forEach(symptomScanTime => {
            if(symptomScanTime.uid === uid) {
                const time = moment(symptomScanTime.timeIn);
                if(time.isSame(moment(date), 'day')) {
                    symptomScanTime.checkedSymptoms = checkedSymptoms;
                }
            }
        });
        return `Updated: ${uid}`;
    }
}

module.exports = SymptomScanTimeRepository;