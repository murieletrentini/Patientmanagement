/* Created by muriele on 03.01.15. */


var patients = store.getPatients();

view.updateTable(patients);


var addAntiBodyButton = document.querySelector('.addAntiBody');
var removeAntiBodyButton = document.querySelector('.removeAntiBody');
addAntiBodyButton.addEventListener('click', model.addAntiBodyToArray);
removeAntiBodyButton.addEventListener('click', model.removeAntiBodyFromArray);


var inputName = document.querySelector('.name');
var inputSurname = document.querySelector('.surname');
function handleclicksave() {
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
}
var saveButton = document.querySelector('.save');
saveButton.addEventListener('click', handleclicksave);


var inputSearch = document.querySelector('input.search');

function handlesearch() {
    var filteredPatients = store.getFilteredPatients(inputSearch.value);
    view.updateTable(filteredPatients);
}
inputSearch.addEventListener('keyup', handlesearch);


function onRemovePatient(patientID) {
    var ask = confirm("Soll der Patient wirklich gelöscht werden?");
    if (ask === true) {
        removePatient(patientID);
        store.savePatients(patients);
        view.updateTable(patients);
    }
}


function removePatient(patientID) {
    _.remove(patients, function predicate(patient) {
        return patient.id === patientID;
    });
}

