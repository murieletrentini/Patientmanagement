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
    }
};
