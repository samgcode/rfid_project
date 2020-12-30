const TimeRepository = require('./time/timeRepository');
const TimeController = require('./time/timeController');
const TimeService = require('./time/timeService');
const ExportController = require('./export/exportController');
const ExportService = require('./export/exportService');
const RfidEventService = require('./rfid/rfidEventService');
const Rfid = require('./rfid/read_rfid');

const serviceLocator = {
    repositories: { },
    services: { },
    controllers: { }
};

let timeRepository = new TimeRepository();

serviceLocator.repositories['timeRepository'] = timeRepository;

serviceLocator.services['timeService'] = new TimeService(serviceLocator);
serviceLocator.services['exportService'] = new ExportService(serviceLocator);
serviceLocator.services['rfidEventService'] = new RfidEventService(serviceLocator);

serviceLocator.controllers['timeController'] = new TimeController(serviceLocator);
serviceLocator.controllers['exportController'] = new ExportController(serviceLocator);

const rfid = new Rfid(serviceLocator);
rfid.start();

module.exports = serviceLocator;