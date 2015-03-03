/**
 * Created by muriele on 01.03.15.
 */
var view = {
    updateTable: function (patients) {
        var patientListBodyElement = document.querySelector('#patientlist tbody');
        if (patients.length > 0) {
            var compiled = _.template(document.querySelector('#tableTemplate').innerHTML);
            patientListBodyElement.innerHTML = compiled({patients: patients});
        }
        else {
            patientListBodyElement.innerHTML = document.querySelector('#elseTemplate').innerHTML;
        }
    },
    sortPossibleAntiBodyList: function () {
        var possibleAntiBodyList = document.querySelector('#possibleAntiBody');
        var antiBodyArray = [];

        for (i = 0; i < possibleAntiBodyList.length; i++) {
            antiBodyArray[i] = possibleAntiBodyList.options[i].id + ',' + possibleAntiBodyList.options[i].value + ',' + possibleAntiBodyList.options[i].text;
        }
        antiBodyArray.sort();
        for (i = 0; i < possibleAntiBodyList.length; i++) {
            x = antiBodyArray[i].split(',');
            possibleAntiBodyList.options[i].id = x[0];
            possibleAntiBodyList.options[i].value = x[1];
            possibleAntiBodyList.options[i].text = x[2];
        }
    },
    sortAddedAntiBodyList: function () {
        var addedAntiBodyList = document.querySelector('#addedAntiBody');
        var antiBodyArray = [];

        for (i = 0; i < addedAntiBodyList.length; i++) {
            antiBodyArray[i] = addedAntiBodyList.options[i].id + ',' + addedAntiBodyList.options[i].value + ',' + addedAntiBodyList.options[i].text;
        }
        antiBodyArray.sort();
        for (i = 0; i < addedAntiBodyList.length; i++) {
            x = antiBodyArray[i].split(',');
            addedAntiBodyList.options[i].id = x[0];
            addedAntiBodyList.options[i].value = x[1];
            addedAntiBodyList.options[i].text = x[2];
        }
    }
};
