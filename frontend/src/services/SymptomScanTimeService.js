import axios from 'axios';
import url from '../urlConfig';

const baseUrl = url.baseUrl;

class SymptomScanTimeService {
    async addSymptomScanTime(uid) {
        const response = await axios.post(`http://${baseUrl}/symptomScanTimes`, {
            uid, 
            checkedSymptoms: false,
        });
        console.log(response);
        return response;
    }

    async updateSymptomScanTime(uid, checkedSymptoms) {
        const response = await axios.put(`http://${baseUrl}/symptomScanTime`, {
            uid, 
            checkedSymptoms,
            date: new Date()
        });
        console.log(response);
        return response;
    }
}

export default SymptomScanTimeService;