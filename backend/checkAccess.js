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

const admin = "208 31 23 37";

const loopTime = 500;
setInterval(function() {//loop
    rfid.reset();
    
    let response = rfid.findCard();
    if (!response.status) {
        // console.log("No Card");
        return;
    }

    response = rfid.getUid();
    if (!response.status) {
        console.log("UID Scan Error");
        return;
    }

    const uid = response.data;
    uid.map(e => {
        return e.toString(16);
    });
    const id = `${uid[0]} ${uid[1]} ${uid[2]} ${uid[3]}`;

    if(id === admin) {
        console.log("access granted");
    } else {
        console.log("access denied");
    }

    rfid.stopCrypto();
}, loopTime);
