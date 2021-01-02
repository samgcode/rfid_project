import TimeService from './timeService';
import ExportService from './exportService';
import EventService from './eventService';

const serviceLocator = {
    services: { }
}

serviceLocator.services['timeService'] = new TimeService();
serviceLocator.services['exportService'] = new ExportService();
serviceLocator.services['eventService'] = new EventService();

export default serviceLocator;