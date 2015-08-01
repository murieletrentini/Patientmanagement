/**
 * Created by muriele on 17.07.15.
 */

beforeEach(function () {
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
        return store[key];
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
    });

    describe('#getCaseNr()', function() {
        it('initializes the caseNr with default and returns incremented by 1', function() {
            var caseNr = patientStore.getCaseNr();
            expect(caseNr).toBeDefined();
            expect(caseNr).toEqual(1);
        });
    });

    describe('#getPatients()', function() {
        it('loads patients from localStorage', function() {
            var pats = patientStore.getPatients();
        });
    });

    describe('#savePatients()', function() {
        it('saves patients to localStorage', function() {
            patientStore.savePatients();

        });
    });
});