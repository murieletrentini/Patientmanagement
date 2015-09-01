/**
 * Created by muriele on 14.05.15.
 */
angular.module('patientmanager')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/patientFile/', {
                templateUrl: '../pages/patientFile.html',
                controller: 'PatientFileController'
            })
            .when('/patientFile/:patientId', {
                templateUrl: '../pages/patientFile.html',
                controller: 'PatientFileController'
            })
            .when('/patientList/', {
                templateUrl: '../pages/patientList.html',
                controller: 'PatientListController'
            })
            .when('/panelProgramm/', {
                templateUrl: '../pages/panelProgramm.html',
                controller: 'PanelProgrammController'
            })
            .otherwise({
                redirectTo: '/patientList'
            });
    });

