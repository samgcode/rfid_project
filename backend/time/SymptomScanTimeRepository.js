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
        
        date.setHours(0,0,0,0);
        const dateTime = date.getTime();

        let symptomScanTimeOut;
        this._data.forEach(symptomScanTime => {
            if(symptomScanTime.uid === uid) {
                const symptomScanTimeDate = symptomScanTime.timeIn;
                const time = new Date(symptomScanTimeDate.getTime());
                time.setHours(0,0,0,0);
                if(time.getTime() === dateTime) {
                    symptomScanTimeOut = symptomScanTime;
                }
            }
        });
        return symptomScanTimeOut;
    }

    async getSymptomScanTimesByDate(startDate, endDate) {
        await this.readFile();

        startDate.setHours(0,0,0,0);
        endDate.setHours(0,0,0,0);

        console.log('start: ', startDate);
        console.log('end: ', endDate);

        const startTime = startDate.getTime();
        const endTime = endDate.getTime();

        let symptomScanTimes = [];

        this._data.forEach(symptomScanTime => {
            const symptomScanTimeDate = symptomScanTime.timeIn;
            const time = new Date(symptomScanTimeDate.getTime());
            time.setHours(0,0,0,0);
            if(time >= startTime && time <= endTime) {
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
        const date = new Date();
        date.setHours(0,0,0,0);
        const dateTime = date.getTime();

        this._data.forEach(symptomScanTime => {
            if(symptomScanTime.uid === uid) {
                const symptomScanTimeDate = symptomScanTime.timeIn;
                const time = new Date(symptomScanTimeDate.getTime());
                time.setHours(0,0,0,0);
                if(time.getTime() === dateTime) {
                    symptomScanTime.timeOut = new Date();
                }
            }
        });
        return `Updated: ${uid}`;
    }

    async updateCheckedByDate(uid, checkedSymptoms, dateIn) {
        await this.readFile();

        const date = new Date(dateIn);
        date.setHours(0,0,0,0);
        const dateTime = date.getTime();

        this._data.forEach(symptomScanTime => {
            if(symptomScanTime.uid === uid) {
                const symptomScanTimeDate = symptomScanTime.timeIn;
                const time = new Date(symptomScanTimeDate.getTime());
                time.setHours(0,0,0,0);
                if(time.getTime() === dateTime) {
                    symptomScanTime.checkedSymptoms = checkedSymptoms;
                }
            }
        });
        return `Updated: ${uid}`;
    }
}

module.exports = SymptomScanTimeRepository;