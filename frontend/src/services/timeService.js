import axios from 'axios';
import url from '../urlConfig';

const baseUrl = url.baseUrl;

class TimeService {
    async updateTime(uid, checkedSymptoms) {
        const response = await axios.put(`http://${baseUrl}/times`, {
            uid, 
            checkedSymptoms
        });

        return response;
    }
}

export default TimeService;