const UidStream = require('./UidStream');

const logger = require('logger').createLogger({className: __filename});

class SymptomScanTimeController {
    constructor(serviceLocator) {
        this.dbConnected = false;
        this._symptomScanTimeService = serviceLocator.services.symptomScanTimeService;
        this._eventService = serviceLocator.services.rfidEventService;
        this._clients = [];
    }

    async ping(ctx) {
        try {
            this._eventService.sendConnectedEvent();
            ctx.body = 'pong';
        } catch(err) {
            ctx.throw(err);
        }
    }

    async getSymptomScanTimes(ctx) {
        try {
            const symptomScanTimes = await this._symptomScanTimeService.getSymptomScanTimes();
            ctx.body = symptomScanTimes;
        } catch(err) {
            ctx.throw(err);    
        }
    }

    symptomScanTimeEventHandler(ctx) {
        if(this.dbConnected) {
            logger.info('connection open');
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
            this._eventService.sendConnectedEvent();
        }
    }
    
    async getSymptomScanTimeById(ctx) {
        try {
            const uid = ctx.params.uid;
            const symptomScanTime = await this._symptomScanTimeService.getSymptomScanTimeByUid(uid);
            ctx.body = symptomScanTime;
        } catch(err) {
            ctx.throw(err);    
        }
    }

    async getCurrentlyCheckedIn(ctx) {
        try {
            const symptomScanTimes = await this._symptomScanTimeService.getCurrentlyCheckedIn();
            ctx.body = symptomScanTimes;
        } catch(err) { 
            ctx.throw(err);
        }
    }

    sendEventsToAll(symptomScanTimeEvent) {
        clients.forEach(c => c.res.write({data: `${JSON.stringify(symptomScanTimeEvent)}\n\n`}));
    }
     
    async addSymptomScanTime(ctx) {
        try {
            const { uid, checkedSymptoms } = ctx.request.body;
            const response = await this._symptomScanTimeService.addSymptomScanTime(uid, checkedSymptoms);
            ctx.body = response;
        } catch(err) {
            ctx.throw(err);
        }
    }

    async updateSymptomScanTime(ctx) {
        try {
            const { uid } = ctx.request.body;
            const response = await this._symptomScanTimeService.updateSymptomScanTime(uid);
            ctx.body = response;
        } catch(err) {
            ctx.throw(err);
        }
    }

    async updateCheckedByDate(ctx) {
        try {
            const { uid, checkedSymptoms, date } = ctx.request.body;
            const response = await this._symptomScanTimeService.updateCheckedByDate(uid, checkedSymptoms, date);
            ctx.body = response;
        } catch(err) {
            ctx.throw(err);
        }
    }

    async scan(ctx) {
        try {
            const uid = ctx.params.uid;
            this._eventService.handleRfidEvent(uid);
            ctx.body = 'request sent'; 
        } catch(err) {
            ctx.throw(err);    
        }
    }

    async removeOldRecords(ctx) {
        try {
            const days = ctx.params.days;
            const response = await this._symptomScanTimeService.removeOldRecords(days);
            ctx.body = response;
        } catch(err) {
            ctx.throw(err);
        }
    }

    async checkScanner(ctx) {
        try {
            this._eventService.checkScanner();
        } catch(err) {
            ctx.throw(err);
        }
    }
}

module.exports = SymptomScanTimeController;