
class StartupService {
    constructor(serviceLocator) {
        this._symptomScanTimeController = serviceLocator.controllers.symptomScanTimeController;
        this._eventService = serviceLocator.services.rfidEventService;
    }
    
    startApp() {
        this._symptomScanTimeController.dbConnected = true;
    }
}

module.exports = StartupService;