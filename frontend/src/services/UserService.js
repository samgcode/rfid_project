import axios from 'axios';
import url from '../urlConfig';

const baseUrl = url.baseUrl;

class UserService {
    async addUser(uid, name) {
        const response = await axios.post(`http://${baseUrl}/users`, {
            uid, 
            name,
        });

        return response;
    }

    async updateUser(uid, name) {
        const response = await axios.put(`http://${baseUrl}/users`, {
            uid, 
            name,
        });

        return response;
    }

    async getCurrentlySignedIn() {
        const respose = await axios.get(`http://${baseUrl}/currentlyCheckedIn`)
        return respose.data
    }
}

export default UserService;