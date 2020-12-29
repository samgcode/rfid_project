import TimeService from './timeService';

const serviceLocator = {
    services: { }
}

serviceLocator.services['timeService'] = new TimeService();

export default serviceLocator;