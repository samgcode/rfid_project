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

const loopTime = 1000;

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
        this.updateScannedUids();
        
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
        if(this.canScan(uid) === true) {
            const canAdd = await this._eventService.checkRfid(uid);
            console.log(canAdd);
            if(canAdd) {
                this.addScanned(uid);
            }
        }

        rfid.stopCrypto();
    }

    addScanned(uid) {
        const date = new Date();
        scannedUids.push({
            uid: uid,
            time: date
        });
    }

    canScan(uid){
        let canScan = true;
        scannedUids.forEach(element => {
            console.log({
                current: uid,
                element: element.uid
            })
            // console.log('check: ', (element.uid === uid));
            if(element.uid === uid) {
                // console.log('FALSE');
                canScan = false;
            }
        }); 
        return canScan;
    }

    updateScannedUids() {
        const date = new Date();
        const min = date.getMinutes();
        const day = date.getDate();
        let tempScanned = [];
        scannedUids.forEach(element => {
            const elementDay = element.time.getDate();
            if(day === elementDay) {
                const elementMin = element.time.getMinutes();
                console.log(`day: ${elementDay}, min: ${elementMin}`);
                if(min - elementMin < scanCoolDown) {
                    tempScanned.push(element);
                }
            }
        });
        scannedUids = tempScanned;
        console.log(scannedUids);
    }
}

module.exports = ReadRfid;