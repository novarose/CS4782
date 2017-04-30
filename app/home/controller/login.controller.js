/**
 * Created by Nick on 4/30/2017.
 */
'use strict';

angular.module("Authentication")
.controller('LoginController', ['$scope','$rootScope', '$state', 'LoginService'], function($scope, $rootscope, $location, LoginService) {

    $scope.login = function() {
        $scope.getData = false;
        LoginService.use($scope.username, $scope.password, function(serverResponse) {
            if(serverResponse.success) {
                $scope.getData = true;
                LoginService.credentials($scope.username, $scope.password);
                $state.go('view');
            }
            else {
                $scope.errorMessage = serverResponse.errorMessage;
            }

        })
    }
});