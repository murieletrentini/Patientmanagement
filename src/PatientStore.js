angular.module('patientmanager').factory('PatientStore', function ($filter) {

    return {
        id: undefined,
        getPatients: function () {
            var patientStorage = JSON.parse(localStorage.getItem('storedPatients'));
            if (patientStorage == null) {
                patientStorage = {};
            }
            return patientStorage;
        },
        getFilteredPatients: function (query) {
            if (query === '' || _.isUndefined(query)) {
                return this.getPatients();
            }

            var upperCaseQuery = $filter('uppercase')(query);
            return _.filter(this.getPatients(), function (patient) {
                return _.values(patient).join(' ').toUpperCase().indexOf(upperCaseQuery) !== -1;
            });
        },
        savePatients: function (patients) {
            localStorage.setItem('storedPatients', angular.toJson(patients));
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
            if (this.id === null) {
                this.id = 0;
            }
            else {
                this.id = parseInt(this.id, 10);
            }
        },
        caseNr: undefined,
        initCaseNr: function () {
            this.caseNr = localStorage.getItem('lastCaseNr');
            if (this.caseNr == null) {
                this.caseNr = 0;
            }
            else {
                this.caseNr = parseInt(this.caseNr, 10);
            }
        },
        getCaseNr: function () {
            if (_.isUndefined(this.caseNr)) {
                this.initCaseNr();
            }
            this.caseNr = this.caseNr + 1;
            localStorage.setItem('lastCaseNr', this.caseNr);
            return this.caseNr;
        }

    };

});
