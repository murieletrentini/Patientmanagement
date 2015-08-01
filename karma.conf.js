module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-route/angular-route.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/lodash/index.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
            'node_modules/ui-select/dist/select.js',
            'src/app.js',
            'src/*.js',
            'spec/*.js'
        ],
        // web server port
        port: 8081,

        // cli runner port
        runnerPort: 9000,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        browsers: ['Chrome'],
        reporters: ['progress','junit'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 20000
    });
};