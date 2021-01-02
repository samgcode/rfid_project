import axios from 'axios';
import url from '../urlConfig';

const baseUrl = url.baseUrl;

class SymptomScanTimeService {
    async updateSymptomScanTime(uid, checkedSymptoms) {
        const response = await axios.put(`http://${baseUrl}/symptomScanTime`, {
            uid, 
            checkedSymptoms
        });

        return response;
    }
}

export default SymptomScanTimeService;