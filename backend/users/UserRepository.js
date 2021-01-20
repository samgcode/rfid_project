const moment = require('moment');

const User = require('./UserModel');

class UserRepository {
    async getUserByUid(uid) {
        const users = await User.find({'uid': uid}, (users) => {
            return users;
        });
        return users[0];
    }

    async addUser(uid, name) {
        const date = new Date();
        const user = new User({
            uid: uid,
            name: name
        });
        await user.save();
        return `Added: ${name}`;
    }
}

module.exports = UserRepository;