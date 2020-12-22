const TimeController = require('./time/timeController');
const TimeRepository = require('./time/timeRepository');

const serviceLocator = {
    repositories: { },
    controllers: { }
};

let timeRepository = new TimeRepository();

serviceLocator.repositories['timeRepository'] = timeRepository;

serviceLocator.controllers['timeController'] = new TimeController(serviceLocator);

module.exports = serviceLocator;