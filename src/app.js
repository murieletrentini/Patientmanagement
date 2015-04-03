var patientmanagerModule = angular.module('patientmanager', []);

patientmanagerModule.controller('MainController', function () {
    var vm = this;
    vm.onSave = onSave;
    vm.newPatientId = 1;
    vm.newPatientName = '';
    vm.newPatientSurname = '';
    vm.newPatientGender = 'weiblich';
    vm.newPatientBirthday = '';
    vm.newPatientBloodType = 'A';
    vm.newPatientRhesus = 'positiv';
    vm.newPatientAntiBodies = [];
    vm.patientArray = [{
        id: 1,
        surname: 'Trentini',
        name: 'Muriele',
        gender: 'weiblich',
        birthday: '15.10.1988',
        bloodType: '0',
        rhesus: 'positiv'
    }];

    vm.newAnimalName = '';
    vm.animals = [{name: 'zebra', legcount: 4}, {name: 'kangaroo', legcount: 2}];

    function onSave() {
        vm.patientArray.push({
            id: vm.newPatientId,
            name: vm.newPatientName,
            surname: vm.newPatientSurname,
            gender: vm.newPatientGender,
            birthday: vm.newPatientBirthday,
            bloodType: vm.newPatientBloodType,
            rhesus: vm.newPatientRhesus,
            antiBodies: vm.newPatientAntiBodies
        });

    }
});
