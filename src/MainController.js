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


    function onSave() {
        vm.newPatient.id = PatientStore.getID();
        buildAntiBodyString();
        vm.patientArray.push(vm.newPatient);
        PatientStore.savePatients(vm.patientArray);
        resetPatient();

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
