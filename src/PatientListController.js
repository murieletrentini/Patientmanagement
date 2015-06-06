/**
 * Created by muriele on 21.05.15.
 */
angular.module('patientmanager').controller('PatientListController', function (PatientStore, $modal) {
    var vm = this;
    vm.patients = PatientStore.getPatients();
    vm.filteredPatients = PatientStore.getFilteredPatients();
    vm.onRemove = onRemove;
    vm.openRemovePatientConfirmationDialog = openRemovePatientConfirmationDialog;
    vm.handleSearch = handleSearch;

    function onRemove(patientId) {
        delete vm.patients[patientId];
        PatientStore.savePatients(vm.patients);
    }

    function handleSearch (query) {
        vm.filteredPatients = PatientStore.getFilteredPatients(query);
    }

    function openRemovePatientConfirmationDialog(patientId) {

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
