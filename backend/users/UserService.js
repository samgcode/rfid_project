class UserService {
    constructor(serviceLocator) {
        this._userRepository = serviceLocator.repositories.userRepository;
    }

    async getUserByUid(uid) {
        try {
            const user = await this._userRepository.getUserByUid(uid);
            return user;
        } catch(err) {
            console.log(err);    
        }
    }

    async addUser(uid, name) {
        try {
            const response = await this._userRepository.addUser(uid, name);
            return response;
        } catch(err) {
            console.log(err);
        }
    }

    async updateUser(uid, name) {
        try {
            const response = await this._userRepository.updateUser(uid, name);
            return response;
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = UserService;