/**
 * Created by muriele on 01.03.15.
 */

var model = {
    antiBodyArray: [],
    addAntiBodyToArray: function () {
        var selectedAntiBody = document.querySelector('#possibleAntiBody option:checked');
        if (selectedAntiBody !== null) {
            selectedIndex = selectedAntiBody.index;
            document.querySelector('#addedAntiBody').appendChild(selectedAntiBody);
            model.antiBodyArray.push(selectedAntiBody.value);
            view.sortAddedAntiBodyList()
        }
    },
    removeAntiBodyFromArray: function () {
        var selectedAntiBody = document.querySelector('#addedAntiBody option:checked');
        if (selectedAntiBody !== null) {
            model.antiBodyArray.splice(selectedAntiBody.index, 1);
            document.querySelector('#possibleAntiBody').appendChild(selectedAntiBody);
            view.sortPossibleAntiBodyList();
        }
    },
    buildNewPatientObject: function (inputName, inputSurname) {
        var sex = document.querySelector('input[name="sex"]:checked').value;
        var bloodType = document.querySelector('input[name="bloodType"]:checked').value;
        var rhesus = document.querySelector('input[name="rhesus"]:checked').value;
        var addedAntiBody = document.querySelector('#addedAntiBody');
        var inputAntiBody = '';
        if (addedAntiBody.length > 0) {
            inputAntiBody = this.antiBodyArray.join(', ');
        }
        else {
            inputAntiBody = "keine";
        }
        return {
            name: inputName.value,
            surname: inputSurname.value,
            antiBody: inputAntiBody,
            sex: sex,
            bloodType: bloodType + " " + rhesus,
            id: store.getId()
        };
    }
};