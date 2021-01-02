const SymptomScanTimeRepository = require('./time/SymptomScanTimeRepository');
const SymptomScanTimeController = require('./time/SymptomScanTimeController');
const SymptomScanTimeService = require('./time/SymptomScanTimeService');
const ExportController = require('./export/ExportController');
const ExportService = require('./export/ExportService');
const RfidEventService = require('./rfid/RfidEventService');
const Rfid = require('./rfid/ReadRfid');

const serviceLocator = {
    repositories: { },
    services: { },
    controllers: { }
};

let symptomScanTimeTimeRepository = new SymptomScanTimeRepository();

serviceLocator.repositories['symptomScanTimeRepository'] = symptomScanTimeTimeRepository;

serviceLocator.services['symptomScanTimeService'] = new SymptomScanTimeService(serviceLocator);
serviceLocator.services['exportService'] = new ExportService(serviceLocator);
serviceLocator.services['rfidEventService'] = new RfidEventService(serviceLocator);

serviceLocator.controllers['symptomScanTimeController'] = new SymptomScanTimeController(serviceLocator);
serviceLocator.controllers['exportController'] = new ExportController(serviceLocator);

const rfid = new Rfid(serviceLocator);
rfid.start();

module.exports = serviceLocator;