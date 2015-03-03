/* Created by muriele on 03.01.15. */

var patients = store.getPatients();

view.updateTable(patients);


var addAntiBodyButton = document.querySelector('.addAntiBody');
var removeAntiBodyButton = document.querySelector('.removeAntiBody');
addAntiBodyButton.addEventListener('click', model.addAntiBodyToArray);
removeAntiBodyButton.addEventListener('click', model.removeAntiBodyFromArray);


var inputName = document.querySelector('.name');
var inputSurname = document.querySelector('.surname');

var saveButton = document.querySelector('.save');
saveButton.addEventListener('click', controller.handleClickSave);


var inputSearch = document.querySelector('input.search');


inputSearch.addEventListener('keyup', controller.handleSearch);




