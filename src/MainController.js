/**
 * Created by muriele on 03.04.15.
 */
angular.module('patientmanager').controller('MainController', function (RefDataStore, PatientStore) {
    var vm = this;
    RefDataStore.getAntiBodies(function (data) {
        vm.availableAntiBodies = data;
    });
    vm.patientArray = PatientStore.getPatients();
    vm.onSave = onSave;
    vm.onRemove = onRemove;



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

    function onRemove() {
        $('#deletePatientModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget);
            var patientId = button.data('whatever');
            var modal = $(this);
            _.remove(vm.patientArray, function predicate(patient) {
                return patient.id === patientId;
            });
            PatientStore.savePatients(vm.patientArray);
        });
        $('#deletePatientModal').modal('hide');


    }
});
