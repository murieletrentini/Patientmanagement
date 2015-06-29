/**
 * Created by muriele on 10.05.15.
 */
angular.module('patientmanager').controller('PatientFileController', function (PatientStore, RefDataStore, $routeParams) {

    var vm = this;
    RefDataStore.getAnalyses(function (data) {
        vm.availableAnalyses = data;
    });
    RefDataStore.getAntiBodies(function (data) {
        vm.availableAntiBodies = data;
    });
    vm.patients = PatientStore.getPatients();
    vm.patientAnalyses = '';
    vm.patient = {
        cases: {},
        antiBodies: []
    };
    vm.patientValidity = '';
    //RegEx for ng-pattern of patient name/surname input
    vm.nameRegex = /[a-zA-Z]+/g;
    //RegEx for ng-pattern of patient birthdate input
    vm.birthDateRegex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d\b/;
    vm.findPatient = findPatient;
    vm.createNewCase = createNewCase;
    vm.removeCase = removeCase;
    vm.saveCase = saveCase;
    vm.saveDiagnosis = saveDiagnosis;
    vm.savePersonalData = savePersonalData;

    if (!_.isUndefined($routeParams.patientId)) {
        if ($routeParams.patientId === '+') {
            vm.patient = {
                id: PatientStore.getID(),
                cases: {},
                antiBodies: []
            };
        }
        else {
            var patientId = parseInt($routeParams.patientId, 10);
            vm.patient = vm.patients[patientId];
        }
    }

    function savePatientToStore() {
        vm.patients[vm.patient.id] = vm.patient;
        PatientStore.savePatients(vm.patients);
    }

    function savePersonalData() {
        if (!vm.patientValidity.$valid) {
            //shows relevant error Messages
            vm.patientValidity.errorMsg = true;
        } else {
            //hides all previous error Messages
            vm.patientValidity.errorMsg = false;
            buildAntiBodyString();
            savePatientToStore();
        }

    }

    function buildAntiBodyString() {
        if (vm.patient.antiBodies.length > 0) {
            vm.patient.antiBodyString = (_.pluck(_.sortBy(vm.patient.antiBodies, 'order'), 'label')).join(', ');
        }
        else {
            vm.patient.antiBodyString = 'keine';
        }
    }

    function saveDiagnosis() {
        buildAntiBodyString();
        savePatientToStore();
    }



    function findPatient($event, patientId) {
        if ($event.keyCode === 13) {
            vm.patient = vm.patients[patientId];
        }
    }


    function createNewCase() {
        if (_.isUndefined(vm.patient.id)) {
            return;
        }

        var newCase = {
            date: new Date(),
            analyses: [],
            nr: PatientStore.getCaseNr(),
        };
        if (_.isUndefined(vm.patient.cases)) {
            vm.patient.cases = {};
        }

        vm.patient.cases[newCase.nr] = newCase;

    }

    function saveCase(casenr) {
        savePatientToStore();
    }

    function removeCase(caseNr) {
        delete vm.patient.cases[caseNr];
        saveCase();
    }

});

