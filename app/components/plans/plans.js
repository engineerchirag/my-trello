'use strict';

angular.module('myApp.plans', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/plans', {
    templateUrl: '/components/plans/plans.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$in', '$scope', function($in, $scope) {

}]);