"use strict"
const Mfrc522 = require("mfrc522-rpi");
const SoftSPI = require("rpi-softspi");

const softSPI = new SoftSPI({
    clock: 23, // pin number of SCLK
    mosi: 19, // pin number of MOSI
    miso: 21, // pin number of MISO
    client: 24 // pin number of CS
});

const rfid = new Mfrc522(softSPI).setResetPin(22);

const loopTime = 500;

class ReadRfid {
    constructor(serviceLocator) {
        this._timeService = serviceLocator.services.timeService;
        console.log('this._timeService', this._timeService);
        setInterval(this.loop, loopTime, this._timeService);
    }

    async loop(timeService) {
        rfid.reset();
        // console.log(timeService);
        
        let response = rfid.findCard();
        if (!response.status) {
            return;
        }

        response = rfid.getUid();
        if (!response.status) {
            console.log("UID Scan Error");
            return;
        }

        const id = response.data;
        id.map(e => {
            return e.toString(16);
        });
        const uid = `${id[0]} ${id[1]} ${id[2]} ${id[3]}`;

        console.log(uid);
        const time = await timeService.getTimeByUid(uid);
        // console.log(time);
        if(time) {
            timeService.updateTime(uid);
        } else {
            await timeService.addTime(uid, true);
        }


        rfid.stopCrypto();
    }
}

module.exports = ReadRfid;