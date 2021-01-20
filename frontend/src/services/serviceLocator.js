import SymptomScanTimeService from './SymptomScanTimeService';
import ExportService from './ExportService';
import EventService from './EventService';
import UserService from './UserService';

const serviceLocator = {
    services: { }
}

serviceLocator.services['symptomScanTimeService'] = new SymptomScanTimeService();
serviceLocator.services['exportService'] = new ExportService();
serviceLocator.services['eventService'] = new EventService();
serviceLocator.services['userService'] = new UserService();

export default serviceLocator;