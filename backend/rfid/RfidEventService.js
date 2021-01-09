const EventEmitter = require("events");
const moment = require('moment');

const scanCooldown = 1;//min

class RfidEventService {
    constructor(serviceLocator) {
        this._symptomScanTimeService = serviceLocator.services.symptomScanTimeService;
        this._events = new EventEmitter();
        this._events.setMaxListeners(0);
    }

    onData(listener) {
        this._events.on('data', listener);
    }

    removeListener(listener) {
        this._events.off('data', listener);
    }

    async handleRfidEvent(uid) {
        const symptomScanTimes = await this._symptomScanTimeService.getSymptomScanTimeByDateUid(uid, new Date());
        console.log('symptoim scan times: ', symptomScanTimes);
        if(symptomScanTimes && symptomScanTimes.length > 0) {
            const symptomScanTime = symptomScanTimes[0];
            console.log(symptomScanTime.checkedSymptoms);
            if(symptomScanTime.checkedSymptoms) {
                if(this.checkCooldown(symptomScanTime)) {
                    console.log('TEST');
                    this._events.emit("data", { id: uid, checkSypmtomsRequired: false });
                    this._symptomScanTimeService.updateSymptomScanTime(uid);
                }
            } else {
                this._events.emit("data", { id: uid, checkSypmtomsRequired: true });
            }
        } else {
            this._events.emit("data", { id: uid, checkSypmtomsRequired: true });
            console.log('add');
            await this._symptomScanTimeService.addSymptomScanTime(uid, false);
        }
    }

    checkCooldown(symptomScanTime) {
        // return true;
        const dateTime = moment().subtract(scanCooldown, 'minutes');
        let time = moment(symptomScanTime.timeIn.getTime());
        if(symptomScanTime.timeOut) {
            time = moment(symptomScanTime.timeOut.getTime());
        }
        if(time <= dateTime) {
            return true;
        }
        return false;
    }
}

module.exports = RfidEventService;