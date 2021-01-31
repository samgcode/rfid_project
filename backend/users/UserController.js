class UserController {
    constructor(serviceLocator) {
        this._userService = serviceLocator.services.userService;
    }

    async getUserByUid(ctx) {
        try {
            const uid = ctx.params.uid;
            const user = await this._userService.getUserByUid(uid);
            ctx.body = user;
        } catch(err) {
            ctx.throw(err);    
        }
    }

    async addUser(ctx) {
        try {
            const { uid, name } = ctx.request.body;
            const response = await this._userService.addUser(uid, name);
            ctx.body = response;
        } catch(err) {
            ctx.throw(err);
        }
    }

    async updateUser(ctx) {
        try {
            const { uid, name } = ctx.request.body;
            const response = await this._userService.updateUser(uid, name);
            ctx.body = response;
        } catch(err) {
            ctx.throw(err);
        }
    }
}

module.exports = UserController;