const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');
const moment = require('moment');

const filePath = './data/times.csv';

class TimeRepository {
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

    async getTimes() {
        await this.readFile();
        return this._data;
    } 

    async getTimeByUid(uid) {
        await this.readFile();
        let time;
        this._data.forEach(element => {
            if(element.uid === uid) {
                time = element;
            }
        });
        return time;
    }

    async getTimesByDate(startDate, endDate) {
        await this.readFile();
        console.log('start: ', startDate);
        console.log('end: ', endDate);
        const startDay = startDate.getDate();
        const startMonth = startDate.getMonth();
        const endDay = endDate.getDate();
        const endMonth = endDate.getMonth();
        let times = [];

        this._data.forEach(time => {
            const timeDay = time.timeIn.getDate();
            const timeMonth = time.timeIn.getMonth();
            if(timeDay >= startDay && timeMonth >= startMonth) {
                if(timeDay <= endDay && timeMonth <= endMonth) {
                    times.push(time);
                }
            }
        })

        return times;
    }
    
    async addTime(uid, checkedSymptoms) {
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

    async updateTime(uid) {
        await this.readFile();
        this._written = true;
        const time = new Date();
        this._data.map(element => {
            if(element.uid === uid) {
                element.timeOut = time;
            }
            return element;
        });
        return `Updated: ${uid}`;
    }

    async updateChecked(uid, checkedSymptoms) {
        await this.readFile();
        this._data.map(element => {
            if(element.uid === uid) {
                element.checkedSymptoms = checkedSymptoms;
            }
            return element;
        });
        return `Updated: ${uid}`;
    }
}

module.exports = TimeRepository;