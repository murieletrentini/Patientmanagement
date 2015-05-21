/**
 * Created by muriele on 03.04.15.
 */
angular.module('patientmanager').controller('MainController', function (PatientStore, $routeParams) {
    var vm = this;
    vm.patients = PatientStore.getPatients();
    vm.onSave = onSave;

    vm.createNewPatient = '';
    vm.nameRegex = /[a-zA-Z]+/g;
    vm.birthDateRegex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;

    if (!_.isUndefined($routeParams.patientId)) {
        var patientId = parseInt($routeParams.patientId);
        vm.newPatient = vm.patients[patientId];

    }

    function resetPatient() {
        vm.newPatient = {
            name: '',
            surname: '',
            gender: 'weiblich',
            birthday: '',
            bloodType: 'A',
            rhesus: 'positiv',
            antiBodies: [],
            antiBodyString: '',
            id: ''
        };
    }






    function buildAntiBodyString() {
        if (vm.newPatient.antiBodies.length > 0) {
            vm.newPatient.antiBodyString = (_.pluck(_.sortBy(vm.newPatient.antiBodies, 'order'), 'label')).join(', ');
        }
        else {
            vm.newPatient.antiBodyString = 'keine';
        }
    }

    function onSave() {

        if (vm.createNewPatient.$valid) {
            buildAntiBodyString();
           vm.createNewPatient.submitted = false;
            //gets new id if patient is new i.e. not edited
            if (vm.newPatient.id === '') {
                vm.newPatient.id = PatientStore.getID();
            }
            vm.patients[vm.newPatient.id] = vm.newPatient;

            PatientStore.savePatients(vm.patients);
            resetPatient();
        }
        else {
            vm.createNewPatient.submitted = true;
        }

    }



});
