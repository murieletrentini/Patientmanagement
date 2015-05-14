/**
 * Created by muriele on 10.05.15.
 */
angular.module('patientmanager').controller('PatientFileController', function (PatientStore) {
    var vm = this;
    vm.patientArray = PatientStore.getPatients();
    vm.patient = {};
    vm.patient.case = [
        {
            nr: '',
            date: '',
            analysis: []
        }
    ];
    vm.findPatient = findPatient;
    vm.createNewCase = createNewCase;

    function findPatient($event, patientID) {
        if ($event.keyCode === 13) {
            vm.patientIndex = _.findIndex(vm.patientArray, function (patient) {
                return patient.id === patientID;
            });
            vm.patient = vm.patientArray[vm.patientIndex];
        }
    }

    function createNewCase () {
        var monthNames = [
            '.1.', '.2.', '.3.',
            '.4.', '.5.', '.6.', '.7.',
            '.8.', '.9.', '.10.',
            '.11.', '.12.'
        ];

        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        vm.patient.case.date = day + monthNames[monthIndex] + year;
    }
});
