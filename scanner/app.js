const ReadRfid = require('./ReadRfid')

async function main() {
    const rfid = new ReadRfid();
    rfid.start();
}


main().catch((error)=> {
    console.error(error);
})