const EventEmitter = require("events");
const moment = require('moment');
const logger = require('logger').createLogger({className: __filename});
const exec = require('exec');

const scanCooldown = 1;//min
const sleepTime = 5;//sec

class RfidEventService {
    constructor(serviceLocator) {
        this._scanner;
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
        this._events.emit('data', { connected: true });
    }

    checkScanner() {
        this._scanner.logNext = true;
    }

    async handleRfidEvent(uid) {
        // this.wakeScreen();
        const user = await this._userService.getUserByUid(uid);
        let name = null;
        if(user) {
            name = user.name;
        }
        if(name) {
            const symptomScanTimes = await this._symptomScanTimeService.getSymptomScanTimeByDateUid(uid, new Date());
            if(symptomScanTimes && symptomScanTimes.length > 0) {
                const symptomScanTime = symptomScanTimes[0];
                logger.info(symptomScanTime);
                if(symptomScanTime.checkedSymptoms) {
                    if(this.checkCooldown(symptomScanTime)) {
                        logger.info({ id: uid, name: name, checkSypmtomsRequired: false });
                        this._events.emit('data', { id: uid, name: name, checkSypmtomsRequired: false });
                        this._symptomScanTimeService.updateSymptomScanTime(uid);
                    }
                } else {
                    logger.info({ id: uid, name: name, checkSypmtomsRequired: true });
                    this._events.emit('data', { id: uid, name: name, checkSypmtomsRequired: true });
                }
            } else {
                logger.info({ id: uid, name: name, checkSypmtomsRequired: true });
                this._events.emit('data', { id: uid, name: name, checkSypmtomsRequired: true });
                await this._symptomScanTimeService.addSymptomScanTime(uid, false);
            }
        } else {
            logger.info({ id: uid, needName: true, checkSypmtomsRequired: true })
            this._events.emit('data', { id: uid, needName: true, checkSypmtomsRequired: true });
        } 
    }

    wakeScreen() {
        exec(`DISPLAY=:0 xset s activate`, (err, stdout) => {
            if (err) {
                logger.error(err)
            } else {
                logger.info(stdout);
            }
        });
        // exec(`xset s on s ${sleepTime}`, (err, stdout) => {
        //     if (err) {
        //         logger.error(err)
        //     } else {
        //         logger.info(stdout);
        //     }
        // });
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