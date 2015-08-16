/**
 * Created by muriele on 17.07.15.
 */
var store = {};
var testPatient = {
    5: {
        id: 5,
        name: 'Muster',
        surname: 'Anna',
        birthday: '10.10.1946',
        cases: {
            1: {
                date: 'Sun Aug 16 2015 13:00:48 GMT+0200 (CEST)',
                analyses: [],
                nr: 1
            }
        },
        antiBodies: ['Anti-D']
    }
};

beforeEach(function () {
    store = {};
    spyOn(localStorage, 'getItem').and.callFake(function (key) {
        if(store.hasOwnProperty(key)) {
            return store[key];
        }
        else {
            return null;
        }
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
        return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
        store = {};
    });
});

describe('PatientStore', function() {
    beforeEach(module('patientmanager'));

    var patientStore;

    beforeEach(inject(function(_PatientStore_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        patientStore = _PatientStore_;
    }));

    describe('#getID()', function() {
        it('initializes the id with default and returns incremented by 1', function() {
            var id = patientStore.getID();
            expect(id).toBeDefined();
            expect(id).toEqual(1);
        });
        it('returns id value from localStorage incremented by 1', function() {
            store.lastId = 5;
            var id = patientStore.getID();
            expect(id).toBeDefined();
            expect(id).toEqual(6);
        });
    });

    describe('#getCaseNr()', function() {
        it('initializes the caseNr with default and returns incremented by 1', function() {
            var caseNr = patientStore.getCaseNr();
            expect(caseNr).toBeDefined();
            expect(caseNr).toEqual(1);
        });
        it('returns caseNr value from localStorage incremented by 1', function() {
            store.lastCaseNr = 4;
            var caseNr = patientStore.getCaseNr();
            expect(caseNr).toBeDefined();
            expect(caseNr).toEqual(5);
        });
    });

    describe('#getPatients()', function() {
        it('loads patients from localStorage', function() {
            //fills test-store with test-patient
            store.storedPatients = JSON.stringify(testPatient);

            var patientsFromStore = patientStore.getPatients();
            expect(patientsFromStore).toBeDefined();
            expect(patientsFromStore).toEqual(testPatient);
        });
    });

    describe('#savePatients()', function() {
        it('saves patients to localStorage', function() {
            patientStore.savePatients(testPatient);
            var patientInStore = JSON.parse(store.storedPatients);
            expect(patientInStore).toBeDefined();
            expect(patientInStore).toEqual(testPatient);
        });
    });

   describe('#getFilteredPatients()', function() {
     it('loads patients from store and filters by query', function () {
           //fills test-store with test-patient
           store.storedPatients = JSON.stringify(testPatient);

           var filteredPatients = patientStore.getFilteredPatients('Muster');

           expect(filteredPatients).toBeDefined();
           expect(filteredPatients).toEqual([testPatient[5]]);

       });
    });
});