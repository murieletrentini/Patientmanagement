/**
 * Created by muriele on 03.03.15.
 */
var controller = {
    handleSearch: function () {
        var filteredPatients = store.getFilteredPatients(inputSearch.value);
        view.updateTable(filteredPatients);
    },
    handleClickSave: function () {
        var saveMessage = document.querySelector('div.alert');
        if (inputName.validity.valid == true && inputSurname.validity.valid == true) {
            patients.push(model.buildNewPatientObject(inputName, inputSurname));
            store.savePatients(patients);
            view.updateTable(patients);
            inputName.value = '';
            inputSurname.value = '';
            inputSurname.focus();
            saveMessage.hidden = true;
        }
        else {
            saveMessage.hidden = false;
        }
    },
    onRemovePatient: function onRemovePatient(patientID) {
        var ask = confirm("Soll der Patient wirklich gelöscht werden?");
        if (ask === true) {
            controller.removePatient(patientID);
            store.savePatients(patients);
            view.updateTable(patients);
        }
    },
    removePatient: function removePatient(patientID) {
        _.remove(patients, function predicate(patient) {
            return patient.id === patientID;
        });
    }
};
