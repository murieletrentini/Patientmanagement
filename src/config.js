/**
 * Created by muriele on 14.05.15.
 */
angular.module('patientmanager').config(function ($routeProvider) {
        $routeProvider
            .when('/addPatient', {
                templateUrl: '../pages/addPatient.html',
                controller: 'MainController'
            })
            .when('/patientFile/', {
                templateUrl: '../pages/patientFile.html',
                controller: 'PatientFileController'
            })
            .when('/patientFile/:patientId', {
                templateUrl: '../pages/patientFile.html',
                controller: 'PatientFileController'
            })
            .otherwise({
                redirectTo: '/addPatient'
            });
    });
