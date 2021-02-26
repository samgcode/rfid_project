const SymptomScanTimeRepository = require('./time/SymptomScanTimeRepositoryMO');
const UserRepository = require('./users/UserRepository');

const SymptomScanTimeService = require('./time/SymptomScanTimeService');
const UserService = require('./users/UserService');
const ExportService = require('./export/ExportService');
const RfidEventService = require('./rfid/RfidEventService');
const StartupService = require('./StartupService');
const dbService = require('./databaseService');

const SymptomScanTimeController = require('./time/SymptomScanTimeController');
const ExportController = require('./export/ExportController');
const UserController = require('./users/UserController');

const Rfid = require('./rfid/ReadRfid');

const serviceLocator = {
    repositories: { },
    services: { },
    controllers: { }
};

serviceLocator.repositories['symptomScanTimeRepository'] = new SymptomScanTimeRepository();
serviceLocator.repositories['userRepository'] = new UserRepository();

serviceLocator.services['symptomScanTimeService'] = new SymptomScanTimeService(serviceLocator);
serviceLocator.services['exportService'] = new ExportService(serviceLocator);
serviceLocator.services['userService'] = new UserService(serviceLocator);
serviceLocator.services['rfidEventService'] = new RfidEventService(serviceLocator);

serviceLocator.controllers['symptomScanTimeController'] = new SymptomScanTimeController(serviceLocator);
serviceLocator.controllers['exportController'] = new ExportController(serviceLocator);
serviceLocator.controllers['userController'] = new UserController(serviceLocator);

serviceLocator.services['startupService'] = new StartupService(serviceLocator);

const dev_db_url = 'mongodb://localhost:27017/SymptomScanTimes';

dbService.intializeDatabase(dev_db_url, serviceLocator.services.startupService);

const rfid = new Rfid(serviceLocator);
serviceLocator.services.rfidEventService._scanner = rfid;
rfid.start();

module.exports = serviceLocator;