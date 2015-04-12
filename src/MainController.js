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
            vm.newPatient.antiBodyString = (_.map(vm.newPatient.antiBodies, 'label')).join(', ');
        }
        else {
            vm.newPatient.antiBodyString = 'keine';
        }
    }

    vm.patientArray = [{
        id: 1,
        surname: 'Trentini',
        name: 'Muriele',
        gender: 'weiblich',
        birthday: '15.10.1988',
        bloodType: '0',
        rhesus: 'positiv',
        antiBodies: [{
            order: 0,
            label: 'Anti-D'
        },
            {
                order: 1,
                label: 'Anti-C'
            }],
        antiBodyString: 'Anti-D, Anti-C'
    }];

    function onSave() {
        vm.newPatient.id = 1;
        buildAntiBodyString();
        vm.patientArray.push(vm.newPatient);
        resetPatient();

    }

    function onRemove(patientId) {
        var ask = confirm('Soll der Patient wirklich gelöscht werden?');
        if (ask === true) {
            _.remove(vm.patientArray, function predicate(patient) {
                return patient.id === patientId;
            });
        }

    }
});
