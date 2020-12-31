const Router = require('@koa/router');

const serviceLocator = require('./serviceLocator');

const router = new Router();

const timeController = serviceLocator.controllers.timeController;
const exportController = serviceLocator.controllers.exportController;


router.get('/', function(ctx) {
    ctx.body = 'The api is running';
});

router.get('/times', timeController.getTimes.bind(timeController));
router.get('/times/:uid', timeController.getTimeById.bind(timeController));
router.get('/export/all', exportController.getTimes.bind(exportController));
router.get('/export', exportController.getTimesByDate.bind(exportController));
router.post('/times', timeController.addTime.bind(timeController));
router.put('/time', timeController.updateChecked.bind(timeController));

router.get('/timeEvents', timeController.timeEventHandler.bind(timeController));

module.exports = router;