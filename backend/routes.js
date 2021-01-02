const Router = require('@koa/router');

const serviceLocator = require('./serviceLocator');

const router = new Router();

const symptomScanTimeController = serviceLocator.controllers.symptomScanTimeController;
const exportController = serviceLocator.controllers.exportController;


router.get('/', function(ctx) {
    ctx.body = 'The api is running';
});

router.get('/symptomScanTimes', symptomScanTimeController.getSymptomScanTimes.bind(symptomScanTimeController));
router.get('/symptomScanTimes/:uid', symptomScanTimeController.getSymptomScanTimeById.bind(symptomScanTimeController));

router.get('/export/all', exportController.getSymptomScanTimes.bind(exportController));
router.get('/export/:startDate/:endDate', exportController.getSymptomScanTimesByDate.bind(exportController));

router.post('/symptomScanTimes', symptomScanTimeController.addSymptomScanTime.bind(symptomScanTimeController));
router.put('/symptomScanTime', symptomScanTimeController.updateChecked.bind(symptomScanTimeController));

router.get('/symptomScanTimeEvents', symptomScanTimeController.symptomScanTimeEventHandler.bind(symptomScanTimeController));

module.exports = router;