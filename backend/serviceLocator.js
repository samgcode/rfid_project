const TimeController = require('./time/timeController');
const TimeRepository = require('./time/timeRepository');
const TimeService = require('./time/timeService');
const Rfid = require('./rfid/read_rfid');

const serviceLocator = {
    repositories: { },
    services: { },
    controllers: { }
};

let timeRepository = new TimeRepository();

serviceLocator.repositories['timeRepository'] = timeRepository;

serviceLocator.services['timeService'] = new TimeService(serviceLocator);

serviceLocator.controllers['timeController'] = new TimeController(serviceLocator);

const rfid = new Rfid(serviceLocator);
rfid.start();

module.exports = serviceLocator;