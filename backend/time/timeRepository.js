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
    
    async updateTime(uid, timeOut) {
        await this.readFile();
        this._written = true;
        this._data.map(element => {
            console.log(uid);
            if(element.uid === uid) {
                element.timeOut = timeOut;
                console.log('test');
            }
            return element;
        });
        
    }
}

module.exports = TimeRepository;