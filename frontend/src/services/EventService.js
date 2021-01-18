import axios from 'axios';
import url from '../urlConfig';

const baseUrl = url.baseUrl;

class EventService {
    constructor() {
        this._source = new EventSource(`http://${baseUrl}/symptomScanTimeEvents`);
        this.setupSource();
    }

    async ping() {
        const response = await axios.get(`http://${baseUrl}/symptomScanTimes/ping`);

        return response;
    }

    setupSource() {
        this._source.onerror = console.error;
    }

    setOnOpen(func) {
        this._source.onopen = func;
    }

    setOnMessage(func) {
        this._source.onmessage = func;
    }
}

export default EventService;