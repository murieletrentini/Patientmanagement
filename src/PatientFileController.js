/**
 * Created by muriele on 10.05.15.
 */
angular.module('patientmanager').controller('PatientFileController', function (PatientStore, RefDataStore, $routeParams) {

    var vm = this;
    RefDataStore.getAnalysis(function (data) {
        vm.availableAnalysis = data;
    });
    vm.patientArray = PatientStore.getPatients();
    vm.patient = {
        cases: []
    };
    vm.findPatient = findPatient;
    vm.createNewCase = createNewCase;
    vm.saveCase = saveCase;

    if (!_.isUndefined($routeParams.patientId)){
       var patientId = parseInt($routeParams.patientId);
        vm.patient = PatientStore.getPatientById(patientId);

    }

    function findPatient($event, patientID) {
        if ($event.keyCode === 13) {
            vm.patient = PatientStore.getPatientById(patientID);
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
            vm.patient.cases = [];
        }

        vm.patient.cases.push(newCase);
    }

    function saveCase() {
        vm.patientArray.splice(_.findIndex(vm.patientArray, function(patient) {
            return patient.id === vm.patient.id;
        }), 1, vm.patient);
        PatientStore.savePatients(vm.patientArray)
    }

    vm.currentlySelectedCaseNr = 5;

});
