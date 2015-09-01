/**
 * Created by muriele on 21.05.15.
 */
angular.module('patientmanager').controller('PanelProgrammController', function (RefDataStore) {
    var vm = this;
    vm.newPanel = {};
    vm.newCell = {};
    vm.addCellDiv = false;
    vm.availableCells = RefDataStore.getCells();
    vm.avaiablePanels = RefDataStore.getPanels();
    vm.addCell = addCell;
    vm.cancleCell = cancleCell;
    vm.saveCell = saveCell;


    function addCell () {
        vm.addCellDiv = true;
    }

    function cancleCell () {
        vm.addCellDiv = false;
    }

    function saveCell () {
        vm.availableCells.push(vm.newCell);
        RefDataStore.saveCell(vm.availableCells);
        vm.newCell = {};
        vm.addCellDiv = false;
    }
});
