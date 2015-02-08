/* Created by muriele on 03.01.15. */

var saveButton = document.querySelector('.save');
var inputName = document.querySelector('.name');
var inputSurname = document.querySelector('.surname');
var inputAk = document.querySelector('.ak');
var patientListBodyElement = document.querySelector('#patientlist tbody');
var inputSearch =document.querySelector('input.search');
var patientList = document.querySelector('#patientlist table');

var patients = [];


    patientListBodyElement.innerHTML = localStorage.getItem("newPatient");



var handleclicksave = function () {

    var sex = document.querySelector('input[name="sex"]:checked').value;
    var bg = document.querySelector('input[name="bg"]:checked').value;
    var rh = document.querySelector('input[name="rh"]:checked').value;

    var patient = {
        name: inputName.value,
        surname: inputSurname.value,
        ak: inputAk.value,
        sex: sex,
        bg: bg + " " + rh
    };
    patients.push(patient);
    console.log(patients);
    inputName.value = '';
    inputSurname.value = '';
    inputAk.value = 'keine';
    updateTable();
};

function updateTable () {
    var text ='';
    var i;
    for (i = 0; i < patients.length; i++) {
        var currentpat = patients[i];
        text += localStorage.getItem("newPatient");
        text += "<tr> <td>" + currentpat.surname + "</td>";
        text += "<td>" + currentpat.name + "</td>";
        text += "<td>" + currentpat.sex + "</td>";
        text += "<td>" + currentpat.bg + "</td>";
        text += "<td>" + currentpat.ak + "</td> </tr>";
    }
    localStorage.setItem("newPatient", text);
    patientListBodyElement.innerHTML = localStorage.getItem("newPatient");
}

saveButton.addEventListener('click', handleclicksave);


var handlesearch = function () {

    var rowNr;

    for (var rowIndex = 0; rowIndex < patientList.rows.length; rowIndex++) {
        var rowData ='';

        if (rowIndex == 0) {
            rowNr = patientList.rows.item(rowIndex).cells.length;
            continue;
        }

        for (var colIndex = 0; colIndex < rowNr; colIndex++) {
            rowData += patientList.rows.item(rowIndex).cells.item(colIndex).textContent;
        }

        if (rowData.indexOf(inputSearch.value) == -1) {
            patientList.rows.item(rowIndex).style.display = 'none';
        }
        else {
            patientList.rows.item(rowIndex).style.display = 'table-row';
        }
    }

};

inputSearch.addEventListener('keyup', handlesearch);

// localStorage.removeItem("newPatient");

