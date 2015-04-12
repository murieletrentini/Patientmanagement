/**
 * Created by muriele on 03.04.15.
 */
angular.module('patientmanager').controller('MainController', function () {
    var vm = this;
    vm.onSave = onSave;
    vm.onRemove = onRemove;
    vm.availableAntiBodies = [

        {
            order: 0,
            label: 'Anti-D'
        },
        {
            order: 1,
            label: 'Anti-C'
        },
        {
            order: 2,
            label: 'Anti-c'
        },
        {
            order: 3,
            label: 'Anti-E'
        },
        {
            order: 4,
            label: 'Anti-e'
        },
        {
            order: 5,
            label: 'Anti-K'
        },
        {
            order: 6,
            label: 'Anti-k'
        },
        {
            order: 7,
            label: 'Anti-Kpa'
        },
        {
            order: 8,
            label: 'Anti-Kpb'
        },
        {
            order: 9,
            label: 'Anti-Fya'
        },
        {
            order: 10,
            label: 'Anti-Fyb'
        },
        {
            order: 11,
            label: 'Anti-Jka'
        },
        {
            order: 12,
            label: 'Anti-Jkb'
        },
        {
            order: 13,
            label: 'Anti-Lea'
        },
        {
            order: 14,
            label: 'Anti-Leb'
        },
        {
            order: 15,
            label: 'Anti-P1'
        },
        {
            order: 16,
            label: 'Anti-M'
        },
        {
            order: 17,
            label: 'Anti-N'
        },
        {
            order: 18,
            label: 'Anti-S'
        },
        {
            order: 19,
            label: 'Anti-s'
        },
        {
            order: 20,
            label: 'Anti-Lua'
        },
        {
            order: 21,
            label: 'Anti-Lub'
        }


    ];
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
        /* var ask = confirm('Soll der Patient wirklich gelöscht werden?');
         if (ask === true) {
         _.remove(vm.patientArray, function predicate(patient) {
         return patient.id === patientId;
         });
         }*/

    }
});
