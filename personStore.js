/**
 * Created by muriele on 21.02.15.
 */
var store = {
    id: undefined,
    getPatients: function () {
        var patientStorage = JSON.parse(localStorage.getItem("storedPatientArray"));
        if (patientStorage == null) {
            patientStorage = [];
        }
        return patientStorage;
    },
    getId: function () {
        if (_.isUndefined(this.id)) {
            this.init();
        }
        this.id = this.id + 1;
        localStorage.setItem("lastId", this.id);
        return this.id;
    },
    init: function () {
        this.id = localStorage.getItem("lastId");
        if (this.id == null) {
            this.id = 0;
        }
        else {
            this.id = parseInt(this.id, 10);
        }
    },
    savePatients: function (patients) {
        localStorage.setItem("storedPatientArray", JSON.stringify(patients));
    },
    getFilteredPatients: function (query) {
        return _.filter(this.getPatients(), function (patient) {
           return query === patient.surname;
        });
    }
};