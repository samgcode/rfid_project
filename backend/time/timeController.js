const UidStream = require('./UidStream');

class TimeController {
    constructor(serviceLocator) {
        this._timeService = serviceLocator.services.timeService;
        this._eventService = serviceLocator.services.rfidEventService;
        this._clients = [];
    }

    async getTimes(ctx) {
        try {
            const times = await this._timeService.getTimes();
            ctx.body = times;
        } catch(err) {
            console.log(err);    
        }
    }

    timeEventHandler(ctx) {
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
    
    async getTimeById(ctx) {
        try {
            const uid = ctx.params.uid;
            const time = await this._timeService.getTimeByUid(uid);
            ctx.body = time;
        } catch(err) {
            console.log(err);    
        }
    }

    sendEventsToAll(timeEvent) {
        clients.forEach(c => c.res.write({data: `${JSON.stringify(timeEvent)}\n\n`}));
    }
     
    async addTime(ctx) {
        try {
            const { uid, checkedSymptoms } = ctx.request.body;
            const response = await this._timeService.addTime(uid, checkedSymptoms);
            // this._eventService.handleRfidEvent(uid);
            ctx.body = response;
        } catch(err) {
            console.log(err);
        }
    }

    async updateTime(ctx) {
        try {
            const { uid } = ctx.request.body;
            const response = await this._timeService.updateTime(uid);
            ctx.body = response;
        } catch(err) {
            console.log(err);
        }
    }

    async updateChecked(ctx) {
        try {
            const { uid, checkedSymptoms } = ctx.request.body;
            const response = await this._timeService.updateChecked(uid, checkedSymptoms);
            ctx.body = response;
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = TimeController;