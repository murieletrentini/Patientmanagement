/**
 * Created by muriele on 03.03.15.
 */
PatMng.controller = {
    init: function () {
        this.patients = PatMng.store.getPatients();
        PatMng.view.init();
        PatMng.view.updateTable(this.patients);
        PatMng.view.addAntiBodyButton.addEventListener('click', this.addAntiBodyToSelection);
        PatMng.view.removeAntiBodyButton.addEventListener('click', this.removeAntiBodyFromSelection);
        PatMng.view.saveButton.addEventListener('click', this.handleClickSave);
        PatMng.view.inputSearch.addEventListener('keyup', this.handleSearch);
        PatMng.view.inputBirthDate.addEventListener('keyup', this.normalizeDateInput);
        PatMng.view.inputBirthDate.addEventListener('keypress', this.preventAlpha);
    },

    preventAlpha: function (evt) {
        // prevent keypress if not a number or not colon
        if ((evt.keyCode > 58 || evt.keyCode < 48) && evt.keyCode !== 46) {
            evt.preventDefault();
        }
        if (PatMng.view.inputBirthDate.value.length > 9) {
            evt.preventDefault();
        }
    },

    normalizeDateInput: function () {
        var dateInput = PatMng.view.inputBirthDate.value;

        var twoDigitsRegex = /^\d{3}$/;
        var fourDigitsRegex = /^\d{2}\.\d{3}$/;

        if (twoDigitsRegex.test(dateInput)) {
            PatMng.view.inputBirthDate.value = [dateInput.slice(0, 2), '.', dateInput.slice(2)].join('');
        }


        if (fourDigitsRegex.test(dateInput)) {
            PatMng.view.inputBirthDate.value = [dateInput.slice(0, 5), '.', dateInput.slice(5)].join('');
        }

    },
    handleSearch: function () {
        var filteredPatients = PatMng.store.getFilteredPatients(PatMng.view.inputSearch.value);
        PatMng.view.updateTable(filteredPatients);
    },
    handleClickSave: function () {

        if (PatMng.view.inputName.validity.valid !== true || PatMng.view.inputSurname.validity.valid !== true) {
            PatMng.view.saveMessageAlert.hidden = false;
            return;
        }

        var duplicatePatientsSurname = PatMng.store.getFilteredPatients(PatMng.view.inputSurname.value);
        var duplicatePatientsName = PatMng.store.getFilteredPatients(PatMng.view.inputName.value);
        if (duplicatePatientsSurname.length > 0 && duplicatePatientsName.length > 0) {
            PatMng.view.duplicateMessageAlert.hidden = false;
            PatMng.view.saveMessageAlert.hidden = true;
            PatMng.view.updateTable(duplicatePatientsName);
        }
        else {
            PatMng.controller.patients.push(PatMng.controller.buildNewPatientObject());
            PatMng.store.savePatients(PatMng.controller.patients);
            PatMng.view.updateTable(PatMng.controller.patients);
            PatMng.view.inputName.value = '';
            PatMng.view.inputSurname.value = '';
            PatMng.view.inputSurname.focus();
            PatMng.view.saveMessageAlert.hidden = true;
            PatMng.view.duplicateMessageAlert.hidden = true;
        }
    },
    onRemovePatient: function (patientID) {
        var ask = confirm('Soll der Patient wirklich gelöscht werden?');
        if (ask === true) {
            PatMng.controller.removePatient(patientID);
            PatMng.store.savePatients(PatMng.controller.patients);
            PatMng.view.updateTable(PatMng.controller.patients);
        }
    },
    removePatient: function (patientID) {
        _.remove(PatMng.controller.patients, function predicate(patient) {
            return patient.id === patientID;
        });
    },

    addAntiBodyToSelection: function () {
        var selectedAntiBody = PatMng.view.possibleAntiBodySelect.selectedOptions[0];
        if (selectedAntiBody) {
            PatMng.view.addedAntiBodySelect.appendChild(selectedAntiBody);
            PatMng.view.sortAddedAntiBodyList();
        }
    },
    removeAntiBodyFromSelection: function () {
        var selectedAntiBody = PatMng.view.addedAntiBodySelect.selectedOptions[0];
        if (selectedAntiBody) {
            PatMng.view.possibleAntiBodySelect.appendChild(selectedAntiBody);
            PatMng.view.sortPossibleAntiBodyList();
        }
    },
    buildNewPatientObject: function () {

        return {
            name: PatMng.view.inputName.value,
            surname: PatMng.view.inputSurname.value,
            antiBody: PatMng.view.getSelectedAntiBodies(),
            sex: PatMng.view.getSelectedSexValue(),
            birthDate: '',
            bloodType: PatMng.view.getSelectedBloodTypeValue() + ' ' + PatMng.view.getSelectedRhesusValue(),
            id: PatMng.store.getId()
        };
    }
};
