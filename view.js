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
        var lb = document.querySelector('#possibleAntiBody');
        arrTexts = [];

        for (i = 0; i < lb.length; i++) {
            arrTexts[i] = lb.options[i].id + ',' + lb.options[i].value + ',' + lb.options[i].text;
        }
        arrTexts.sort();
        for (i = 0; i < lb.length; i++) {
            el = arrTexts[i].split(',');
            lb.options[i].id = el[0];
            lb.options[i].value = el[1];
            lb.options[i].text = el[2];
        }
    },
    sortAddedAntiBodyList: function () {
        var lb = document.querySelector('#addedAntiBody');
        arrTexts = [];

        for (i = 0; i < lb.length; i++) {
            arrTexts[i] = lb.options[i].id + ',' + lb.options[i].value + ',' + lb.options[i].text;
        }
        arrTexts.sort();
        for (i = 0; i < lb.length; i++) {
            el = arrTexts[i].split(',');
            lb.options[i].id = el[0];
            lb.options[i].value = el[1];
            lb.options[i].text = el[2];
        }
    }
};
