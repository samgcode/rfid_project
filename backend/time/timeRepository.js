const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');
// const csv = require('csv-parse');

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