import SymptomScanTimeService from './SymptomScanTimeService';
import ExportService from './ExportService';
import EventService from './EventService';

const serviceLocator = {
    services: { }
}

serviceLocator.services['symptomScanTimeService'] = new SymptomScanTimeService();
serviceLocator.services['exportService'] = new ExportService();
serviceLocator.services['eventService'] = new EventService();

export default serviceLocator;