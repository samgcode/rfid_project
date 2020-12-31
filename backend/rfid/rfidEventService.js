const EventEmitter = require("events");

const scanCooldown = 1;//min

class RfidEventService {
    constructor(serviceLocator) {
        this._timeService = serviceLocator.services.timeService;
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
        const time = await this._timeService.getTimeByUid(uid);
        console.log(time);
        if(time) {
            if(time.checkedSymptoms === 'true') {
                if(this.checkCooldown(time)) {
                    //fire event for leaving
                    this._events.emit("data", { id: uid, checkSypmtomsRequired: false });
                    console.log('backend update');
                    this._timeService.updateTime(uid);
                }
            } else {
                //fire server event
                this._events.emit("data", { id: uid, checkSypmtomsRequired: true });
                console.log('@FRONTEND');
                //dont do this after:
                console.log('frontend update');
                const checked = true;
                this._timeService.updateChecked(uid, checked);
            }
        } else {
            //fire server event
            this._events.emit("data", { id: uid, checkSypmtomsRequired: true });
            console.log('add');
            await this._timeService.addTime(uid, false);
        }
    }

    checkCooldown(time) {
        return true;
        const min = new Date().getMinutes();
        let timeMin = time.timeIn.getMinutes();
        if(time.timeOut) {
            timeMin = time.timeOut.getMinutes();
        }
        console.log(timeMin);
        if(min - timeMin >= scanCooldown) {
            return true;
        }
        return false;
    }
}

module.exports = RfidEventService;