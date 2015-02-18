/* Created by muriele on 03.01.15. */
function getPatientsFromStorage() {
    var patientStorage = JSON.parse(localStorage.getItem("storedPatientArray"));
    if (patientStorage == null) {
        patientStorage = [];
    }
    return patientStorage;
}

function savePatientsToStorage(patients) {
    localStorage.setItem("storedPatientArray", JSON.stringify(patients));
}

var patients = getPatientsFromStorage();


function updateTable(patients) {
    var patientListBodyElement = document.querySelector('#patientlist tbody');
    if (patients.length > 0) {
        var text = '';
        var i;
        for (i = 0; i < patients.length; i++) {
            var currentpat = patients[i];
            text += "<tr><td>" + currentpat.surname + "</td>";
            text += "<td>" + currentpat.name + "</td>";
            text += "<td>" + currentpat.sex + "</td>";
            text += "<td>" + currentpat.bloodType + "</td>";
            text += "<td>" + currentpat.antiBody + "<span class='glyphicon glyphicon-remove' onclick='removePatient(this)'></span></td></tr>";
        }
        patientListBodyElement.innerHTML = text;
    }
    else {
        text = "<tr><td colspan='4'>Es sind keine Patienten in der Datenbank vorhanden</td></tr>";
        patientListBodyElement.innerHTML = text;
    }
}


updateTable(patients);

var addAntiBodyButton = document.querySelector('.addAntiBody');
var removeAntiBodyButton = document.querySelector('.removeAntiBody');
var addedAntiBodyArray = [];

function handleAddAntiBody() {
    var selectedAntiBody = document.querySelector('#possibleAntiBody option:checked');
    document.querySelector('#addedAntiBody').appendChild(selectedAntiBody);
    addedAntiBodyArray.push(selectedAntiBody.value);
}


addAntiBodyButton.addEventListener('click', handleAddAntiBody);

function handleRemoveAntiBody() {
    var selectedAntiBody = document.querySelector('#addedAntiBody option:checked');
    addedAntiBodyArray.splice(selectedAntiBody.index, 1);
    document.querySelector('#possibleAntiBody').appendChild(selectedAntiBody);
}

removeAntiBodyButton.addEventListener('click', handleRemoveAntiBody);

var inputName = document.querySelector('.name');
var inputSurname = document.querySelector('.surname');
function handleclicksave() {
    var saveMessage = document.querySelector('div.alert');
    if (inputName.validity.valid == true && inputSurname.validity.valid == true) {
        patients.push(buildNewPatientObject());
        savePatientsToStorage(patients);
        updateTable(patients);
        inputName.value = '';
        inputSurname.value = '';
        saveMessage.hidden = true;
    }
    else {
        saveMessage.hidden = false;
    }
}
var saveButton = document.querySelector('.save');
saveButton.addEventListener('click', handleclicksave);



function buildNewPatientObject() {
    var sex = document.querySelector('input[name="sex"]:checked').value;
    var bloodType = document.querySelector('input[name="bloodType"]:checked').value;
    var rhesus = document.querySelector('input[name="rhesus"]:checked').value;
    var addedAntiBody = document.querySelector('#addedAntiBody');
    var inputAntiBody = '';
    if (addedAntiBody.length > 0) {
        inputAntiBody = addedAntiBodyArray.join();
    }
    else {
        inputAntiBody = "keine";
    }
    return {
        name: inputName.value,
        surname: inputSurname.value,
        antiBody: inputAntiBody,
        sex: sex,
        bloodType: bloodType + " " + rhesus
    };
}


var inputSearch = document.querySelector('input.search');

function handlesearch() {
    var patientList = document.querySelector('#patientlist table');
    var rowNr;

    for (var rowIndex = 0; rowIndex < patientList.rows.length; rowIndex++) {
        var rowData = '';

        if (rowIndex == 0) {
            rowNr = patientList.rows.item(rowIndex).cells.length;
            continue;
        }

        for (var colIndex = 0; colIndex < rowNr; colIndex++) {
            rowData += patientList.rows.item(rowIndex).cells.item(colIndex).textContent;
        }

        if (rowData.toUpperCase().indexOf(inputSearch.value.toUpperCase()) == -1) {
            patientList.rows.item(rowIndex).style.display = 'none';
        }
        else {
            patientList.rows.item(rowIndex).style.display = 'table-row';
        }
    }

}
inputSearch.addEventListener('keyup', handlesearch);


function removePatient(clickedElement) {
    var ask = confirm("Soll der Patient wirklich gelöscht werden?");
    if (ask == true) {
        var td = clickedElement.parentNode;
        var tr = td.parentNode.rowIndex;
        var x = tr - 1;
        patients.splice(x, 1);
        savePatientsToStorage(patients);
        updateTable(patients);
    }
}


