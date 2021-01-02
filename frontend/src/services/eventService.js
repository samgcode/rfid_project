import axios from 'axios';
import url from '../urlConfig';

const baseUrl = url.baseUrl;

class EventService {
    constructor() {
        this._source = new EventSource(`http://${baseUrl}/timeEvents`);
        this.setupSource();
    }

    setupSource() {
        this._source.onopen = this.onOpen;
        this._source.onerror = console.error;
    }

    onOpen() {
        console.log('source connected');
    }

    setOnMessage(func) {
        this._source.onmessage = func;
    }
}

export default EventService;