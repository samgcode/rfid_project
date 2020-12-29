import axios from 'axios';
import url from '../urlConfig';

const baseUrl = url.baseUrl;

class TimeService {
    async addTime(uid, checkedSymptoms) {
        const response = await axios.post(`http://${baseUrl}/times`, {
            uid, 
            checkedSymptoms
        });

        return response;
    }
}

export default TimeService;