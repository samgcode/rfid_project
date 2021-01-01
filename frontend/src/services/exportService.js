import axios from 'axios';
import url from '../urlConfig';

const baseUrl = url.baseUrl;

class ExportService {
    async export() {
        const response = await axios.get(`http://${baseUrl}/export/all`);

        return response;
    }
    async exportByDate(startDate, endDate) {
        // console.log(`startDate: ${startDate}, endDate: ${endDate}`);
        const response = await axios.get(`http://${baseUrl}/export/${startDate}/${endDate}`);

        return response;
    }
}

export default ExportService;