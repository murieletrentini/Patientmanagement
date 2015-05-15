angular.module('patientmanager').factory('RefDataStore', function($http){

   return {
       getAntiBodies: function (callback) {
           $http.get('/store/antiBodies.json').
               success(function(data) {
                   callback(data);
               }).
               error(function() {
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
               });
       },
       getAnalysis: function (callback) {
           $http.get('/store/analysis.json').
               success(function(data) {
                   callback(data);
               }).
               error(function() {
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
               });
       }
   };
});
