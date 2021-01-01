import axios from 'axios';
import url from '../urlConfig';

const baseUrl = url.baseUrl;

class TimeService {
    async updateTime(uid, checkedSymptoms) {
        const response = await axios.put(`http://${baseUrl}/time`, {
            uid, 
            checkedSymptoms
        });
        // const response = await axios({
        //     method: 'put',
        //     url: `http://${baseUrl}/time`,
        //     data: {
        //         uid,
        //         checkedSymptoms
        //     }
        // });
        return response;
    }
}

export default TimeService;