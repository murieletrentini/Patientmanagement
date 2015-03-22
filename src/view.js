/**
 * Created by muriele on 01.03.15.
 */
PatMng.view = {
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

        for (var i = 0; i < possibleAntiBodyList.length; i++) {
            antiBodyArray[i] = possibleAntiBodyList.options[i].id + ',' + possibleAntiBodyList.options[i].value + ',' + possibleAntiBodyList.options[i].text;
        }
        antiBodyArray.sort();
        for (var i = 0; i < possibleAntiBodyList.length; i++) {
            x = antiBodyArray[i].split(',');
            possibleAntiBodyList.options[i].id = x[0];
            possibleAntiBodyList.options[i].value = x[1];
            possibleAntiBodyList.options[i].text = x[2];
        }
    },
    sortAddedAntiBodyList: function () {
        var addedAntiBodyList = document.querySelector('#addedAntiBody');
        var antiBodyArray = [];

        for (var i = 0; i < addedAntiBodyList.length; i++) {
            antiBodyArray[i] = addedAntiBodyList.options[i].id + ',' + addedAntiBodyList.options[i].value + ',' + addedAntiBodyList.options[i].text;
        }
        antiBodyArray.sort();
        for (var i = 0; i < addedAntiBodyList.length; i++) {
            var x = antiBodyArray[i].split(',');
            addedAntiBodyList.options[i].id = x[0];
            addedAntiBodyList.options[i].value = x[1];
            addedAntiBodyList.options[i].text = x[2];
        }
    },
    init: function () {
        this.inputName = document.querySelector('.name');
        this.inputSurname = document.querySelector('.surname');
        this.inputBirthDate = document.querySelector('.birthDate');
        this.addedAntiBodySelect = document.querySelector('#addedAntiBody');
        this.possibleAntiBodySelect = document.querySelector('#possibleAntiBody');
        this.sexRadioButtons = document.querySelectorAll('input[name="sex"]');
        this.bloodTypeRadioButtons = document.querySelectorAll('input[name="bloodType"]');
        this.rhesusRadioButtons = document.querySelectorAll('input[name="rhesus"]');
        this.saveMessageAlert = document.querySelector('div.alert-save');
        this.duplicateMessageAlert = document.querySelector('div.alert-duplicate');
        this.addAntiBodyButton = document.querySelector('.addAntiBody');
        this.removeAntiBodyButton = document.querySelector('.removeAntiBody');
        this.saveButton = document.querySelector('.save');
        this.inputSearch = document.querySelector('input.search');

    },
    getSelectedAntiBodies: function () {


        var selectedAntiBodies = _.map(this.addedAntiBodySelect.children, function (optionElement) {
            return optionElement.value;
        });


        var inputAntiBody;
        if (selectedAntiBodies.length > 0) {
            inputAntiBody = selectedAntiBodies.join(', ');
        }
        else {
            inputAntiBody = 'keine';
        }
        return inputAntiBody;
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

