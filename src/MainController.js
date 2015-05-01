/**
 * Created by muriele on 03.04.15.
 */
angular.module('patientmanager').controller('MainController', function (RefDataStore, PatientStore, $modal) {
    var vm = this;
    RefDataStore.getAntiBodies(function (data) {
        vm.availableAntiBodies = data;
    });
    vm.patientArray = PatientStore.getPatients();
    vm.onSave = onSave;
    vm.onRemove = onRemove;
    vm.openConfirmationDialog = openConfirmationDialog;
    vm.preventAlpha = preventAlpha;
    vm.normalizeDateInput = normalizeDateInput;

    vm.birthdayAlert = true;
    vm.nameAlert = true;
    vm.duplicateAlert = true;


    function resetPatient() {
        vm.newPatient = {
            name: '',
            surname: '',
            gender: 'weiblich',
            birthday: '',
            bloodType: 'A',
            rhesus: 'positiv',
            antiBodies: [],
            antiBodyString: ''
        };
    }

    resetPatient();

    function buildAntiBodyString() {
        if (vm.newPatient.antiBodies.length > 0) {
            vm.newPatient.antiBodyString = (_.pluck(_.sortBy(vm.newPatient.antiBodies, 'order'), 'label')).join(', ');
        }
        else {
            vm.newPatient.antiBodyString = 'keine';
        }
    }

    function preventAlpha($event) {
        // prevent keypress if not a number or not period
        if (($event.keyCode > 58 || $event.keyCode < 48) && $event.keyCode !== 46) {
            $event.preventDefault();
        }
        if (vm.newPatient.birthday.length > 9) {
            $event.preventDefault();
        }
    }

    function normalizeDateInput() {
        var birthday = vm.newPatient.birthday;
        var twoDigitsRegex = /^\d{3}$/;
        var fourDigitsRegex = /^\d{2}\.\d{3}$/;

        if (twoDigitsRegex.test(birthday)) {
            vm.newPatient.birthday = [birthday.slice(0, 2), '.', birthday.slice(2)].join('');
        }

        if (fourDigitsRegex.test(birthday)) {
            vm.newPatient.birthday = [birthday.slice(0, 5), '.', birthday.slice(5)].join('');
        }
    }

    function validateBirthday() {
        var day = vm.newPatient.birthday.slice(0, 2);
        var month = vm.newPatient.birthday.slice(3, 5);
        var year = vm.newPatient.birthday.slice(6);
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();

        if (day > 32 || month > 12 || year > currentYear || year < currentYear - 150) {
            return false;
        }
    }

    function onSave() {
        vm.newPatient.id = PatientStore.getID();
        buildAntiBodyString();
        validateBirthday();
        if (validateBirthday() === false){
            vm.birthdayAlert = false;
        }
        else if (vm.newPatient.surname.length < 1 || vm.newPatient.name.length < 1) {
            vm.nameAlert = false;
        }
        else {
            vm.birthdayAlert = true;
            vm.nameAlert = true;
            vm.patientArray.push(vm.newPatient);
            PatientStore.savePatients(vm.patientArray);
            resetPatient();
        }

    }

    function onRemove(patientId) {
        _.remove(vm.patientArray, function predicate(patient) {
            return patient.id === patientId;
        });
        PatientStore.savePatients(vm.patientArray);
    }

    function openConfirmationDialog(patientId) {

        var modalInstance = $modal.open({
            templateUrl: 'removePatientModal',
            controller: 'ModalInstanceCtrl',
            size: 'sm'
        });

        modalInstance.result.then(function () {
            vm.onRemove(patientId);
        });
    }

});
