const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SymptomScanTimeSchema = new Schema({
    uid: {type: Number, required: true},
    timeIn: {type: Date, required: true},
    timeOut: {type: Date, required: false},
    checkedSymptoms: {type: Boolean, required: true},
    checkedIn: {type: Boolean, required: false}
});

module.exports = mongoose.model('SymptomScanTime', SymptomScanTimeSchema);