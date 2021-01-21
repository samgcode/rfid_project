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

const loopTime = 50;

let scannedUids = [];
const scanCoolDown = 1;//min

class ReadRfid {
    constructor(serviceLocator) {
        this._eventService = serviceLocator.services.rfidEventService;
    }
    start() {
        setInterval(() => {
            this.loop();
        }, loopTime);
    }
    async loop() {
        rfid.reset();
        
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
        const uid = `${id[0]}${id[1]}${id[2]}${id[3]}`;

        console.log(uid);
        await this._eventService.handleRfidEvent(uid);


        rfid.stopCrypto();
    }
}

module.exports = ReadRfid;