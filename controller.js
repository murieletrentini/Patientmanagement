/**
 * Created by muriele on 03.03.15.
 */
var controller = {
    init: function() {
        this.patients = store.getPatients();
        view.init();
        view.updateTable(this.patients);
        view.addAntiBodyButton.addEventListener('click', this.addAntiBodyToSelection);
        view.removeAntiBodyButton.addEventListener('click', this.removeAntiBodyFromSelection);
        view.saveButton.addEventListener('click', this.handleClickSave);
        view.inputSearch.addEventListener('keyup', this.handleSearch);
    },
    handleSearch: function () {
        var filteredPatients = store.getFilteredPatients(inputSearch.value);
        view.updateTable(filteredPatients);
    },
    handleClickSave: function () {
        
        if (view.inputName.validity.valid == true && view.inputSurname.validity.valid == true) {
            var duplicatePatientsSurname = store.getFilteredPatients(view.inputSurname.value);
            var duplicatePatientsName = store.getFilteredPatients(view.inputName.value);
            if (duplicatePatientsSurname.length > 0 && duplicatePatientsName.length > 0) {
                view.duplicateMessageAlert.hidden = false;
                view.saveMessageAlert.hidden = true;
                view.updateTable(duplicatePatientsName);
            }
            else {
                controller.patients.push(controller.buildNewPatientObject());
                store.savePatients(controller.patients);
                view.updateTable(controller.patients);
                view.inputName.value = '';
                view.inputSurname.value = '';
                view.inputSurname.focus();
                view.saveMessageAlert.hidden = true;
                view.duplicateMessageAlert.hidden = true;
            }
        }
        else {
            view.saveMessageAlert.hidden = false;
        }
    },
    onRemovePatient: function (patientID) {
        var ask = confirm("Soll der Patient wirklich gelöscht werden?");
        if (ask === true) {
            controller.removePatient(patientID);
            store.savePatients(controller.patients);
            view.updateTable(controller.patients);
        }
    },
    removePatient: function (patientID) {
        _.remove(controller.patients, function predicate(patient) {
            return patient.id === patientID;
        });
    },

    addAntiBodyToSelection: function () {
        var selectedAntiBody = view.possibleAntiBodySelect.selectedOptions[0];
        if (selectedAntiBody) {
            view.addedAntiBodySelect.appendChild(selectedAntiBody);
            view.sortAddedAntiBodyList()
        }
    },
    removeAntiBodyFromSelection: function () {
        var selectedAntiBody = view.addedAntiBodySelect.selectedOptions[0];
        if (selectedAntiBody) {
            view.possibleAntiBodySelect.appendChild(selectedAntiBody);
            view.sortPossibleAntiBodyList();
        }
    },
    buildNewPatientObject: function () {

        return {
            name: view.inputName.value,
            surname: view.inputSurname.value,
            antiBody: view.getSelectedAntiBodies(),
            sex: view.getSelectedSexValue(),
            birthDate: '',
            bloodType: view.getSelectedBloodTypeValue() + " " + view.getSelectedRhesusValue(),
            id: store.getId()
        };
    }
};
