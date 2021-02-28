const moment = require('moment');

const logger = require('logger').createLogger({className: __filename});

const SymptomScanTime = require('./SymptomScanTimeModel');

class SymptomScanTimeRepository {
    constructor() {

    }   

    async getSymptomScanTimes() {
        const symptomScanTimes = await SymptomScanTime.find((symptomScanTimes) => {
            return symptomScanTimes;
        });
        return symptomScanTimes;
    } 

    async getSymptomScanTimeByUid(uid) {
        const symptomScanTimes = await SymptomScanTime.find({'uid': uid}, (symptomScanTimes) => {
            return symptomScanTimes;
        });
        return symptomScanTimes;
    }

    async getSymptomScanTimeByDateUid(uid, date) {
        const data = await SymptomScanTime.find({'uid': uid}, (symptomScanTimes) => {
            return symptomScanTimes;
        });
        let symptomScanTimes = [];
        Array.prototype.forEach.call(data, (symptomScanTime) => {
            const time = moment(symptomScanTime.timeIn);
            if(time.isSame(moment(date), 'day')) {
                symptomScanTimes.push(symptomScanTime);
            }
        });
        return symptomScanTimes;
    }

    async getSymptomScanTimesByDate(startDate, endDate) {
        const data = await SymptomScanTime.find({'uid': uid}, (symptomScanTimes) => {
            return symptomScanTimes;
        });

        let symptomScanTimes = [];
        data.forEach(symptomScanTime => {
            const time = moment(symptomScanTime.timeIn);
            const isAfter = time.isAfter(moment(startDate), 'day');
            const isBefore = time.isBefore(moment(endDate), 'day');
            if(isAfter && isBefore) {
                symptomScanTimes.push(symptomScanTime);
            }
        });

        return symptomScanTimes;
    }
    
    async addSymptomScanTime(uid, checkedSymptoms) {
        const date = new Date();
        const symptomScanTime = new SymptomScanTime({
            uid: uid,
            timeIn: date.getTime(),
            timeOut: '',
            checkedSymptoms: checkedSymptoms,
        });
        await symptomScanTime.save();
        return `Added: ${uid}`;
    }

    async updateSymptomScanTime(uid) {
        const data = await SymptomScanTime.find({'uid': uid}, (symptomScanTimes) => {
            return symptomScanTimes;
        });
        const date = new Date();
        let id = null;
        data.forEach(symptomScanTime => {
            const time = moment(symptomScanTime.timeIn);
            if(time.isSame(moment(date), 'day')) {
               id = symptomScanTime._id;
            }
        });
        if(id) {
            await SymptomScanTime.findByIdAndUpdate(id, {timeOut: new Date});
            return `Updated: ${uid}`;
        }
        return 'Not found';
    }

    async updateCheckedByDate(uid, checkedSymptoms, date) {
        const data = await SymptomScanTime.find({'uid': uid}, (symptomScanTimes) => {
            return symptomScanTimes;
        });
        let id = null;
        data.forEach(symptomScanTime => {
            const time = moment(symptomScanTime.timeIn);
            if(time.isSame(moment(date), 'day')) {
               id = symptomScanTime._id;
            }
        });
        if(id) {
            await SymptomScanTime.findByIdAndUpdate(id, {checkedSymptoms: checkedSymptoms});
            return `Updated: ${uid}`;
        }
        return 'Not found';
    }

    async removeOldRecords() {
        const olderThan = moment().subtract(30, 'days').toDate();
        console.log(olderThan);
        SymptomScanTime.find({timeIn: {$lte: olderThan}}).remove().exec();
        return 'Removed old records';
    }
}

module.exports = SymptomScanTimeRepository;