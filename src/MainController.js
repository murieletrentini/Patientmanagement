/**
 * Created by muriele on 03.04.15.
 */
angular.module('patientmanager').controller('MainController', function (RefDataStore) {
    RefDataStore.getAntiBodies(function (data) {
        vm.availableAntiBodies = data;
    });
    var vm = this;
    vm.onSave = onSave;
    vm.onRemove = onRemove;
    vm.patientArray = [];


    function getID() {
        if (_.isUndefined(vm.id)) {
            initID();
        }
        vm.id = vm.id + 1;
        localStorage.setItem('lastId', vm.id);
        return vm.id;
    }

    function initID() {
        vm.id = localStorage.getItem('lastId');
        if (vm.id == null) {
            vm.id = 0;
        }
        else {
            vm.id = parseInt(vm.id, 10);
        }
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
        getID();
        vm.newPatient.id = vm.id;
        buildAntiBodyString();
        vm.patientArray.push(vm.newPatient);
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
        });
        $('#deletePatientModal').modal('hide');


    }
});
