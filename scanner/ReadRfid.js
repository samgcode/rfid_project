"use strict"
const Mfrc522 = require("mfrc522-rpi");
const SoftSPI = require("rpi-softspi");
const axios = require('axios');

const logger = require('logger').createLogger({className: __filename, scannerTransport: true});
const config = require('backend-config');
// console.log(config);


class ReadRfid {

    constructor() {
        this.options = config.scannerOptions;

        this.softSPI = new SoftSPI({
            clock: 23, // pin number of SCLK
            mosi: 19, // pin number of MOSI
            miso: 21, // pin number of MISO
            client: 24 // pin number of CS
        });
        
        this.rfid = new Mfrc522(this.softSPI).setResetPin(22);
        
        this.loopTime = this.options.scanSpeed;
        
        this.scannedUids = [];
        this.scanCoolDown = 1;//min

        this.logNext = false;
    }
    async start() {
        setInterval(() => {
            this.loop();
        }, this.loopTime);
    }
    async loop() {
        this.rfid.reset();
        let response = this.rfid.findCard();
        if (!response.status) {
            logger.debug('No card detected');
            if(this.logNext) {
                this.logNext = false;
                logger.info('Scanner code is alive');
            }
            return;
        }

        response = this.rfid.getUid();
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
        await axios.post(`http://${options.backendUrl}/scan/${uid}`);


        this.rfid.stopCrypto();
    }
}

module.exports = ReadRfid;