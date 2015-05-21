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
    vm.currentlySelectedCaseNr = 5;
    vm.findPatient = findPatient;
    vm.createNewCase = createNewCase;
    vm.saveCase = saveCase;
    vm.removeCase = removeCase;
    vm.patientAnalyses = '';
    vm.onSave = onSave;

    function onSave() {
        buildAntiBodyString();
        vm.patients[vm.patient.id] = vm.patient;
        PatientStore.savePatients(vm.patients);
    }

    function buildAntiBodyString() {
        if (vm.patient.antiBodies.length > 0) {
            vm.patient.antiBodyString = (_.pluck(_.sortBy(vm.patient.antiBodies, 'order'), 'label')).join(', ');
        }
        else {
            vm.patient.antiBodyString = 'keine';
        }
    }

    if (!_.isUndefined($routeParams.patientId)) {
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
            analyses: [],
            nr: PatientStore.getCaseNr(),
        };
        if (_.isUndefined(vm.patient.cases)) {
            vm.patient.cases = {};
        }

        vm.patient.cases[newCase.nr] = newCase;

    }

    function saveCase(casenr) {
        vm.onSave();
    }

    function removeCase(caseNr) {
        delete vm.patient.cases[caseNr];
        saveCase();
    }

});

