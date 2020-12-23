const Pin = require('onoff').Gpio;
const LED = new Pin(4, 'out');

const blinkInterval = setInterval(blinkLED, 250);

function blinkLED() {
    if(LED.readSync() === 0) {
        LED.writeSync(1);
    } else {
        LED.writeSync(0);
    }
}