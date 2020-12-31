import TimeService from './timeService';
import ExportService from './exportService';

const serviceLocator = {
    services: { }
}

serviceLocator.services['timeService'] = new TimeService();
serviceLocator.services['exportService'] = new ExportService();

export default serviceLocator;