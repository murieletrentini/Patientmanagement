angular.module('patientmanager').factory('PatientStore', function () {

    return {
        id: undefined,
        getPatients: function () {
            var patientStorage = JSON.parse(localStorage.getItem('storedPatientArray'));
            if (patientStorage == null) {
                patientStorage = [];
            }
            return patientStorage;
        },
        savePatients: function (patients) {
            localStorage.setItem('storedPatientArray', angular.toJson(patients));
        },
        getID: function () {
            if (_.isUndefined(this.id)) {
                this.initID();
            }
            this.id = this.id + 1;
            localStorage.setItem('lastId', this.id);
            return this.id;
        },
        initID: function () {
            this.id = localStorage.getItem('lastId');
            if (this.id == null) {
                this.id = 0;
            }
            else {
                this.id = parseInt(this.id, 10);
            }
        }

    };

});
