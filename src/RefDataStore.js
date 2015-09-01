angular.module('patientmanager').factory('RefDataStore', function($http){

   return {
       getAntiBodies: function (callback) {
           $http.get('/store/antiBodies.json').
               success(callback).
               error(function() {
                   console.log('Error fetching data from antiBodies.json');
               });
       },
       getAnalyses: function (callback) {
           $http.get('/store/analyses.json').
               success(callback).
               error(function() {
                   console.log('Error fetching data from analyses.json');
               });
       },
       getCells: function () {
           var storedCellsString = localStorage.getItem('storedCells');
           var cellStorage = JSON.parse(storedCellsString);
           if (cellStorage == null) {
               cellStorage = [];
           }
           return cellStorage;
       },
       saveCell: function (availableCells) {
           localStorage.setItem('storedCells', angular.toJson(availableCells));
       },
       getPanels: function () {
           var storedPanelsString = localStorage.getItem('storedCells');
           var panelStorage = JSON.parse(storedPanelsString);
           if (panelStorage == null) {
               panelStorage = [];
           }
           return panelStorage;
       }
   };
});
