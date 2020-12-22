const Router = require('@koa/router');

const serviceLocator = require('./serviceLocator');

const router = new Router();

const timeController = serviceLocator.controllers.timeController;


router.get('/', function(ctx) {
    ctx.body = 'The api is running';
});

router.get('/times', timeController.getTimes.bind(timeController));
router.get('/times/:uid', timeController.getTimeById.bind(timeController));


module.exports = router;