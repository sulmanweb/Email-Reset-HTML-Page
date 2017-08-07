angular.module('reset', ['pascalprecht.translate'])
    .config(['$translateProvider', function ($translateProvider) {
        // English Variables
        $translateProvider.translations('en_US', {
            'APP_NAME': 'Work Chat',
            'RESET_PASSWORD': 'Reset Your Password',
            'NEW_PASSWORD': 'New Password',
            'CONFIRM_NEW_PASSWORD': 'Confirm New Password',
            'CHANGE_PASSWORD_BUTTON': 'Change Password',
            'FOOTER': 'Work Chat, Sulman Baig, Pakistan',
            'ERROR_MESSAGE': 'Password could not be reset because:',
            'SUCCESS_MESSAGE': 'Your Password is changed successfully'
        });
        // Reference: https://goo.gl/QKuoWz
        $translateProvider.fallbackLanguage('en_US');
        // Reference: https://goo.gl/gyS5QP
        $translateProvider.determinePreferredLanguage();
        // Reference: https://goo.gl/IUFYbO
        $translateProvider.useSanitizeValueStrategy(null);
    }])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }])
    .service('ResetPasswordService', ['$http', '$q', function ($http, $q) {
        this.reset_password = function (headers, form) {
            //TODO change this according to the system
            var url = 'http://localhost:3000/api/auth/password';
            var headers = {headers: headers};
            return $http.put(url, form, headers)
                .then(function (res) {
                    return res.data;
                })
                .catch(function (res) {
                    return $q.reject(res.data.errors);
                })
        };
    }])
    .controller('ResetController', ['$scope', '$location', 'ResetPasswordService', '$translate', function ($scope, $location, ResetPasswordService, $translate) {

        $scope.init = function () {
            $scope.loader = false;
            $scope.error_show = false;
            // Get Query params and change according to the system
            $scope.headers = {
                client: $location.search().client_id,
                uid: $location.search().uid,
                utoken: $location.search().token,
                config: $location.search().config,
                expiry: $location.search().expiry,
                reset_password: $location.search().reset_password
            };
            $scope.reset_form = {};
            // Get translation of success message
            $translate('SUCCESS_MESSAGE').then(function (success_message) {
                $scope.success_message = success_message;
            });
            console.log("made by @sulmanweb");
        };

        $scope.init();

        $scope.submit_form = function () {
            $scope.loader = true;
            $scope.error_show = false;
            ResetPasswordService.reset_password($scope.headers, $scope.reset_form)
                .then(function (data) {
                    $scope.loader = false;
                    alert($scope.success_message);
                })
                .catch(function (errors) {
                    $scope.loader = false;
                    $scope.error_show = true;
                    $scope.errors = errors;
                });
        };
    }]);