/**
 * Created by muriele on 10.05.15.
 */
angular.module('patientmanager').controller('PatientFileController', function (PatientStore, RefDataStore, $routeParams) {

    var vm = this;
    RefDataStore.getAnalysis(function (data) {
        vm.availableAnalysis = data;
    });
    vm.patients = PatientStore.getPatients();
    vm.patient = {
        cases: {}
    };
    vm.currentlySelectedCaseNr = 5;
    vm.findPatient = findPatient;
    vm.createNewCase = createNewCase;
    vm.saveCase = saveCase;
    vm.removeCase = removeCase;

    if (!_.isUndefined($routeParams.patientId)){
       var patientId = parseInt($routeParams.patientId);
        vm.patient = vm.patients[patientId];

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
            analysis: [],
            nr: PatientStore.getCaseNr()
        };
        if (_.isUndefined(vm.patient.cases)) {
            vm.patient.cases = {};
        }

        vm.patient.cases[newCase.nr] = newCase;
    }

    function saveCase() {
        vm.patients[vm.patient.id] = vm.patient;
        PatientStore.savePatients(vm.patients);
    }

    function removeCase (caseNr) {
        delete vm.patient.cases[caseNr];
        saveCase();
    }

});

