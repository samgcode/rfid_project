const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');
// const csv = require('csv-parse');

const filePath = './data/times.csv';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
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
        const the_date = new Date();
        const time = `${the_date.getHours()}:${the_date.getMinutes()}`;
        const month = monthNames[the_date.getMonth()];
        const day = `${month}${the_date.getDate()}`;
        this._data.push({
            uid: uid,
            timeIn: time,
            timeOut: '',
            checkedSymptoms: checkedSymptoms,
            day: day
        });
        return `Added: ${uid}`;
    }

    async updateTime(uid, timeOut) {
        await this.readFile();
        this._written = true;
        this._data.map(element => {
            if(element.uid === uid) {
                element.timeOut = timeOut;
            }
            return element;
        });
        return `Updated: ${uid}`;
    }
}

module.exports = TimeRepository;