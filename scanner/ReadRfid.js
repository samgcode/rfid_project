"use strict"
const Mfrc522 = require("mfrc522-rpi");
const SoftSPI = require("rpi-softspi");

const logger = require('logger').createLogger({className: __filename, scannerTransport: true});
const config = require('backend-config');
// console.log(config);
const options = config.scannerOptions;

const softSPI = new SoftSPI({
    clock: 23, // pin number of SCLK
    mosi: 19, // pin number of MOSI
    miso: 21, // pin number of MISO
    client: 24 // pin number of CS
});

const rfid = new Mfrc522(softSPI).setResetPin(22);

const loopTime = options.scanSpeed;

let scannedUids = [];
const scanCoolDown = 1;//min

class ReadRfid {


    constructor() {
        this.logNext = false;
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
            logger.debug('No card detected');
            if(this.logNext) {
                this.logNext = false;
                logger.info('Scanner code is alive');
            }
            return;
        }

        response = rfid.getUid();
        if (!response.status) {
            logger.info("UID Scan Error");
            return;
        }

        const id = response.data;
        id.map(e => {
            return e.toString(16);
        });
        const uid = `${id[0]}${id[1]}${id[2]}${id[3]}`;

        logger.info(uid);
        await this._eventService.handleRfidEvent(uid);


        rfid.stopCrypto();
    }
}

module.exports = ReadRfid;