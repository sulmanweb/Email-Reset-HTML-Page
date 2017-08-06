angular.module('reset', ['pascalprecht.translate'])
    .config(['$translateProvider', function ($translateProvider) {
        // English Variables
        $translateProvider.translations('en_US', {
            'APP_NAME': 'Work Chat',
            'RESET_PASSWORD': 'Reset Your Password',
            'NEW_PASSWORD': 'New Password',
            'CONFIRM_NEW_PASSWORD': 'Confirm New Password',
            'CHANGE_PASSWORD_BUTTON': 'Change Password',
            'FOOTER': 'Work Chat, Sulman Baig, Pakistan'
        });
        // Reference: https://goo.gl/QKuoWz
        $translateProvider.fallbackLanguage('en_US');
        // Reference: https://goo.gl/gyS5QP
        $translateProvider.determinePreferredLanguage();
        // Reference: https://goo.gl/IUFYbO
        $translateProvider.useSanitizeValueStrategy(null);
    }])
    .controller('ResetController', ['$scope', function ($scope) {

        $scope.init = function () {
            console.log("made by @sulmanweb");
        };

        $scope.init();
    }]);