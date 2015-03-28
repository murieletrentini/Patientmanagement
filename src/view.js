/**
 * Created by muriele on 01.03.15.
 */
PatMng.view = {
    init: function () {
        this.inputName = document.querySelector('.name');
        this.inputSurname = document.querySelector('.surname');
        this.inputBirthDate = document.querySelector('.birthDate');
        this.sexRadioButtons = document.querySelectorAll('input[name="sex"]');
        this.bloodTypeRadioButtons = document.querySelectorAll('input[name="bloodType"]');
        this.rhesusRadioButtons = document.querySelectorAll('input[name="rhesus"]');
        this.saveMessageAlert = document.querySelector('div.alert-save');
        this.duplicateMessageAlert = document.querySelector('div.alert-duplicate');
        this.saveButton = document.querySelector('.save');
        this.inputSearch = document.querySelector('input.search');

    },
    buildPossibleAntiBodyList: function (antiBodies) {
        var antiBodyList = document.querySelector('.possibleAntiBodyList');
        if (antiBodies.length > 0) {
            var compiled = _.template(document.querySelector('#antiBodyTemplate').innerHTML);
            antiBodyList.innerHTML = compiled({antiBodies: antiBodies});
        }
        else {
            antiBodyList.innerHTML = '';
        }
    },
    updatePatientAntiBodyList: function (antiBodies) {
        var antiBodyList = document.querySelector('.patientAntiBodyList');
        if (antiBodies.length > 0) {
            var compiled = _.template(document.querySelector('#patientAntiBodyTemplate').innerHTML);
            antiBodyList.innerHTML = compiled({antiBodies: antiBodies});
        }
        else {
            antiBodyList.innerHTML = '';
        }
    },
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
    getBirthDateInputValue: function() {
        return this.inputBirthDate.value;
    },
    getSelectedSexValue: function () {
        return this.getSelectedRadioButtonValue(this.sexRadioButtons);

    },
    getSelectedBloodTypeValue: function () {
        return this.getSelectedRadioButtonValue(this.bloodTypeRadioButtons);
    },
    getSelectedRhesusValue: function () {
        return this.getSelectedRadioButtonValue(this.rhesusRadioButtons);
    },
    getSelectedRadioButtonValue: function (radioButtonArray) {
        var selectedRadio = _.find(radioButtonArray, function (radioButton) {
            return radioButton.checked;
        });
        if (selectedRadio) {
            return selectedRadio.value;
        }
        else {
            throw new Error('no RadioButton is checked');
        }
    }

};

