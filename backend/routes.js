const Router = require('@koa/router');

const serviceLocator = require('./serviceLocator');

const router = new Router();

const symptomScanTimeController = serviceLocator.controllers.symptomScanTimeController;
const userController = serviceLocator.controllers.userController;
const exportController = serviceLocator.controllers.exportController;


router.get('/', function(ctx) {
    ctx.body = 'The api is running';
});

router.get('/symptomScanTimes', symptomScanTimeController.getSymptomScanTimes.bind(symptomScanTimeController));
router.get('/symptomScanTimes/ping', symptomScanTimeController.ping.bind(symptomScanTimeController));
router.get('/symptomScanTimes/:uid', symptomScanTimeController.getSymptomScanTimeById.bind(symptomScanTimeController));
router.get('/clearRecords', symptomScanTimeController.removeOldRecords.bind(symptomScanTimeController));
router.get('/checkScanner', symptomScanTimeController.checkScanner.bind(symptomScanTimeController));

router.post('/scan/:uid', symptomScanTimeController.scan.bind(symptomScanTimeController));

router.get('/users/:uid', userController.getUserByUid.bind(userController));

router.get('/export/all', exportController.getSymptomScanTimes.bind(exportController));
router.get('/export/:startDate/:endDate', exportController.getSymptomScanTimesByDate.bind(exportController));

router.post('/symptomScanTimes', symptomScanTimeController.addSymptomScanTime.bind(symptomScanTimeController));
router.post('/users', userController.addUser.bind(userController));

router.put('/symptomScanTime', symptomScanTimeController.updateCheckedByDate.bind(symptomScanTimeController));
router.put('/users', userController.updateUser.bind(userController));

router.get('/symptomScanTimeEvents', symptomScanTimeController.symptomScanTimeEventHandler.bind(symptomScanTimeController));

module.exports = router;