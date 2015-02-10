/* Created by muriele on 03.01.15. */

var saveButton = document.querySelector('.save');
var inputName = document.querySelector('.name');
var inputSurname = document.querySelector('.surname');
var patientListBodyElement = document.querySelector('#patientlist tbody');
var inputSearch = document.querySelector('input.search');
var patientList = document.querySelector('#patientlist table');
var addAkButton = document.querySelector('.addAk');
var removeAkButton = document.querySelector('.removeAk');
var removeButton = document.querySelector('.remove');

var patientArray = [];

var patientStorage = JSON.parse(localStorage.getItem("storedPatientArray"));
console.log(patientStorage);
if (patientStorage.length > 0) {
    var text = '';
    var i;
    for (i = 0; i < patientStorage.length; i++) {
        var currentpat = patientStorage[i];
        text += "<tr><td>" + currentpat.surname + "</td>";
        text += "<td>" + currentpat.name + "</td>";
        text += "<td>" + currentpat.sex + "</td>";
        text += "<td>" + currentpat.bg + "</td>";
        text += "<td>" + currentpat.ak + "<span class='glyphicon glyphicon-remove' onclick='removePatient(this)'></span></td></tr>";
    }
    patientListBodyElement.innerHTML = text;
}
else {
    text = "<tr><td colspan='4'>Es sind keine Patienten in der Datenbank vorhanden</td></tr>";
    patientListBodyElement.innerHTML = text;
}


var handleAddAk = function () {
    var selectedAk = document.querySelector('#possibleAk option:checked');
    document.querySelector('#addedAk').appendChild(selectedAk);
};

addAkButton.addEventListener('click', handleAddAk);

var handleRemoveAk = function () {
    var selectedAk = document.querySelector('#addedAk option:checked');
    document.querySelector('#possibleAk').appendChild(selectedAk);
};

removeAkButton.addEventListener('click', handleRemoveAk);

var handleclicksave = function () {

    setLocalStorage();
    updateTable();
    inputName.value = '';
    inputSurname.value = '';
};

function setLocalStorage() {
    var storedPatients = JSON.parse(localStorage.getItem("storedPatientArray"));
    if (storedPatients == null) storedPatients = [];
    var sex = document.querySelector('input[name="sex"]:checked').value;
    var bg = document.querySelector('input[name="bg"]:checked').value;
    var rh = document.querySelector('input[name="rh"]:checked').value;
    var addedAk = document.querySelector('#addedAk');
    var inputAk = '';
    var x;
    if (addedAk.length > 0) {
        for (x = 0; x < addedAk.length; x++) {
            inputAk = inputAk + ", " + addedAk[x].value;

        }
        inputAk = inputAk.replace(/([/s/S]*),/, '$1');
    }
    else {
        inputAk = "keine";
    }
    var patientObject = {
        name: inputName.value,
        surname: inputSurname.value,
        ak: inputAk,
        sex: sex,
        bg: bg + " " + rh
    };
    localStorage.setItem("patientObject", JSON.stringify(patientObject));
    storedPatients.push(patientObject);
    localStorage.setItem("storedPatientArray", JSON.stringify(storedPatients));
};

function updateTable() {
    var patientStorage = JSON.parse(localStorage.getItem("storedPatientArray"));
    console.log(patientStorage);

    var text = '';
    var i;
    for (i = 0; i < patientStorage.length; i++) {
        var currentpat = patientStorage[i];
        text += "<tr><td>" + currentpat.surname + "</td>";
        text += "<td>" + currentpat.name + "</td>";
        text += "<td>" + currentpat.sex + "</td>";
        text += "<td>" + currentpat.bg + "</td>";
        text += "<td>" + currentpat.ak + "<span class='glyphicon glyphicon-remove' onclick='removePatient(this)'></span></td></tr>";
    }
    patientListBodyElement.innerHTML = text;

}
saveButton.addEventListener('click', handleclicksave);


var handlesearch = function () {

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

};
inputSearch.addEventListener('keyup', handlesearch);


function removePatient(clickedElement) {
    var ask = confirm("Soll der Patient wirklich gelöscht werden?");
    if (ask == true) {
        var td = clickedElement.parentNode;
        var tr = td.parentNode.rowIndex;
        console.log(tr);
        var patientStorage = JSON.parse(localStorage.getItem("storedPatientArray"));
        var x = tr - 1;
        patientStorage.splice(x, 1);
        localStorage.setItem("storedPatientArray", JSON.stringify(patientStorage));
        window.location.reload();
    }
    else {
    }
}


