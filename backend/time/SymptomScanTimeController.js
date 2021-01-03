const UidStream = require('./UidStream');

class SymptomScanTimeController {
    constructor(serviceLocator) {
        this._symptomScanTimeService = serviceLocator.services.symptomScanTimeService;
        this._eventService = serviceLocator.services.rfidEventService;
        this._clients = [];
    }

    async getSymptomScanTimes(ctx) {
        try {
            const symptomScanTimes = await this._symptomScanTimeService.getSymptomScanTimes();
            ctx.body = symptomScanTimes;
        } catch(err) {
            console.log(err);    
        }
    }

    symptomScanTimeEventHandler(ctx) {
        console.log('connection open');
        ctx.req.socket.setTimeout(0);
        ctx.req.socket.setNoDelay(true);
        ctx.req.socket.setKeepAlive(true);
    
        ctx.set({
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        });
    
        const stream = new UidStream();
        ctx.status = 200;
        ctx.body = stream;
    
        const listener = (data) => {
            stream.write(data);
        };
    
        this._eventService.onData(listener);
    
        stream.on("close", () => {
            this._eventService.removeListener(listener);
        });
    }
    
    async getSymptomScanTimeById(ctx) {
        try {
            const uid = ctx.params.uid;
            const symptomScanTime = await this._symptomScanTimeService.getSymptomScanTimeByUid(uid);
            ctx.body = symptomScanTime;
        } catch(err) {
            console.log(err);    
        }
    }

    sendEventsToAll(symptomScanTimeEvent) {
        clients.forEach(c => c.res.write({data: `${JSON.stringify(symptomScanTimeEvent)}\n\n`}));
    }
     
    async addSymptomScanTime(ctx) {
        try {
            const { uid, checkedSymptoms } = ctx.request.body;
            const response = await this._symptomScanTimeService.addSymptomScanTime(uid, checkedSymptoms);
            // this._eventService.handleRfidEvent(uid);
            ctx.body = response;
        } catch(err) {
            console.log(err);
        }
    }

    async updateSymptomScanTime(ctx) {
        try {
            const { uid } = ctx.request.body;
            const response = await this._symptomScanTimeService.updateSymptomScanTime(uid);
            ctx.body = response;
        } catch(err) {
            console.log(err);
        }
    }

    async updateCheckedByDate(ctx) {
        try {
            const { uid, checkedSymptoms, date } = ctx.request.body;
            const response = await this._symptomScanTimeService.updateCheckedByDate(uid, checkedSymptoms, date);
            ctx.body = response;
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = SymptomScanTimeController;