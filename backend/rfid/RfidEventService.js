const EventEmitter = require("events");
const moment = require('moment');

const scanCooldown = 1;//min

class RfidEventService {
    constructor(serviceLocator) {
        this._symptomScanTimeService = serviceLocator.services.symptomScanTimeService;
        this._userService = serviceLocator.services.userService;
        this._events = new EventEmitter();
        this._events.setMaxListeners(0);
    }

    onData(listener) {
        this._events.on('data', listener);
    }

    removeListener(listener) {
        this._events.off('data', listener);
    }

    sendConnectedEvent() {
        console.log('event');
        this._events.emit('data', { connected: true });
    }

    async handleRfidEvent(uid) {
        const user = await this._userService.getUserByUid(uid);
        let name = null;
        if(user) {
            name = user.name;
        }
        if(name) {
            const symptomScanTimes = await this._symptomScanTimeService.getSymptomScanTimeByDateUid(uid, new Date());
            if(symptomScanTimes && symptomScanTimes.length > 0) {
                const symptomScanTime = symptomScanTimes[0];
                if(symptomScanTime.checkedSymptoms) {
                    if(this.checkCooldown(symptomScanTime)) {
                        this._events.emit('data', { id: uid, name: name, checkSypmtomsRequired: false });
                        this._symptomScanTimeService.updateSymptomScanTime(uid);
                    }
                } else {
                    this._events.emit('data', { id: uid, name: name, checkSypmtomsRequired: true });
                }
            } else {
                this._events.emit('data', { id: uid, name: name, checkSypmtomsRequired: true });
                await this._symptomScanTimeService.addSymptomScanTime(uid, false);
            }
        } else {
            this._events.emit('data', { id: uid, needName: true, checkSypmtomsRequired: true });
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