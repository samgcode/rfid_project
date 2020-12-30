//rfid scanned(uid)
//  add record
//  checke if already scanned
//  fire event

const { monthsShort } = require("moment");

class RfidEventService {
    constructor(serviceLocator) {
        this._timeService = serviceLocator.services.timeService;
    }
    async checkRfid(uid) {
        const time = await this._timeService.getTimeByUid(uid);
        console.log(time);
        if(time) {
            if(time.checkedSymptoms) {
                //fire event for leaving
                console.log('backend update');
                this._timeService.updateTime(uid);
                return true;
            } else {
                //fire server event
                console.log('@FRONTEND');
                // return true;
                //dont do this after:
                console.log('frontend update');
                const checked = true;
                this._timeService.updateChecked(uid, checked);
                return true;
            }
        } else {
            //fire server event
            console.log('add');
            await this._timeService.addTime(uid, false);
            return false;
        }
    }
}

module.exports = RfidEventService;