/**
 * Created by muriele on 21.02.15.
 */
PatMng.store = {
    id: undefined,
    getPatients: function () {
        var patientStorage = JSON.parse(localStorage.getItem('storedPatientArray'));
        if (patientStorage == null) {
            patientStorage = [];
        }
        return patientStorage;
    },
    getId: function () {
        if (_.isUndefined(this.id)) {
            this.init();
        }
        this.id = this.id + 1;
        localStorage.setItem('lastId', this.id);
        return this.id;
    },
    init: function () {
        this.id = localStorage.getItem('lastId');
        if (this.id == null) {
            this.id = 0;
        }
        else {
            this.id = parseInt(this.id, 10);
        }
    },
    savePatients: function (patients) {
        localStorage.setItem('storedPatientArray', JSON.stringify(patients));
    },
    getFilteredPatients: function (query) {
        if (query === '') {
            return this.getPatients();
        }

        var upperCaseQuery = query.toUpperCase();
        return _.filter(this.getPatients(), function (patient) {
            return _.values(patient).join(' ').toUpperCase().indexOf(upperCaseQuery) !== -1;
        });
    },
    antiBodies: [
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

    ]
};
