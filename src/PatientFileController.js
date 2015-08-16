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
    vm.patient = {
        cases: {},
        antiBodies: []
    };

    vm.findPatient = findPatient;
    vm.createNewCase = createNewCase;
    vm.saveCase = saveCase;
    vm.removeCase = removeCase;
    vm.patientAnalyses = '';
    vm.patientData = '';
    vm.patientSeroError = false;
    vm.saveSerodiagnosis = saveSerodiagnosis;
    vm.savePersonalData = savePersonalData;
    //RegEx for ng-pattern of patient name/surname input
    vm.nameRegex = /[a-zA-Z]/;
    //RegEx for ng-pattern of patient birthdate input
    vm.birthDateRegex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d\b/;

    vm.isCollapsed = true;


    if (!_.isUndefined($routeParams.patientId)) {
        var patientId = parseInt($routeParams.patientId);
        vm.patient = vm.patients[patientId];

    }

    function savePersonalData() {

        if (!vm.patientData.$valid) {
            //shows relevant error Messages
            vm.patientData.errorMsg = true;
        } else {
            //gets new id if patient is new i.e. not edited
            if (!vm.patient.id) {
                vm.patient.id = PatientStore.getID();
            }
            if (_.isUndefined(vm.patient.cases)){
            vm.patient.cases = {};
            }
            if (_.isUndefined(vm.patient.antiBodies )){
                vm.patient.antiBodies = [];
            }
           saveToStore();
            //hides all previous error Messages
            vm.patientData.errorMsg = false;
            vm.patientSeroError = false;
        }

    }

    function saveToStore() {
        buildAntiBodyString();
        vm.patients[vm.patient.id] = vm.patient;
        PatientStore.savePatients(vm.patients);
    }


    function saveSerodiagnosis() {
        if (_.isUndefined(vm.patient.id)) {
            vm.patientSeroError = true;
        } else {
            saveToStore();
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



    function findPatient($event, patId) {
        if ($event.keyCode === 13) {
            vm.patient = vm.patients[patId];
        }
    }


    function createNewCase() {
        if (_.isUndefined(vm.patient.id)) {
            return;
        }

        var newCase = {
            date: new Date(),
            analyses: [],
            nr: PatientStore.getCaseNr()
        };

        vm.patient.cases[newCase.nr] = newCase;

    }

    function saveCase() {
        saveToStore();
    }

    function removeCase(caseNr) {
        delete vm.patient.cases[caseNr];

    }

});

